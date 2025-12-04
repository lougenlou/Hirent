const mongoose = require('mongoose');
const Review = require('../models/Review');
const Item = require('../models/Items');       // your Items model file
const Booking = require('../models/Bookings'); // your Bookings model file

// Helper: recompute ratings for an item (aggregation approach A1)
async function recomputeItemRatings(itemId) {
  // aggregate only non-deleted reviews
  const agg = await Review.aggregate([
    { $match: { itemId: mongoose.Types.ObjectId(itemId), deleted: false } },
    {
      $group: {
        _id: '$itemId',
        averageRating: { $avg: '$rating' },
        ratingsCount: { $sum: 1 },
        breakdown: {
          $push: '$rating'
        }
      }
    }
  ]);

  if (!agg || agg.length === 0) {
    // No reviews -> reset fields
    await Item.findByIdAndUpdate(itemId, {
      averageRating: 0,
      ratingsCount: 0,
      ratingsBreakdown: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 }
    }, { new: true }).exec();
    return;
  }

  const data = agg[0];
  // produce breakdown counts
  const breakdownCounts = { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 };
  for (const r of data.breakdown) {
    const k = String(r);
    if (breakdownCounts[k] !== undefined) breakdownCounts[k]++;
  }

  await Item.findByIdAndUpdate(itemId, {
    averageRating: Number(data.averageRating.toFixed(2)),
    ratingsCount: data.ratingsCount,
    ratingsBreakdown: breakdownCounts
  }, { new: true }).exec();
}

// Create review
exports.createReview = async (req, res, next) => {
  try {
    const userId = req.user && (req.user.id || req.user._id); // depends on your authMiddleware
    const { bookingId, itemId, rating, title, comment } = req.body;

    // Validate booking exists and belongs to user
    const booking = await Booking.findById(bookingId).exec();
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // Ensure booking belongs to authenticated user
    const bookingUserId = booking.userId ? String(booking.userId) : String(booking.user);
    if (String(bookingUserId) !== String(userId)) {
      return res.status(403).json({ success: false, message: 'Booking does not belong to the authenticated user' });
    }

    // Optionally: ensure booking is completed (implement your own logic field)
    if (booking.status && booking.status !== 'completed') {
      // adjust according to your booking status enum
      return res.status(400).json({ success: false, message: 'Booking is not eligible for review' });
    }

    // Ensure itemId matches booking's item (defensive check)
    if (booking.itemId && String(booking.itemId) !== String(itemId)) {
      return res.status(400).json({ success: false, message: 'itemId does not match booking.itemId' });
    }

    // Check unique user + booking constraint (index will also enforce)
    const existing = await Review.findOne({ userId: userId, bookingId: bookingId }).exec();
    if (existing) {
      return res.status(409).json({ success: false, message: 'A review for this booking by this user already exists' });
    }

    const now = new Date();
    const editableUntil = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000); // 3 days

    const review = await Review.create({
      userId,
      bookingId,
      itemId,
      rating,
      title,
      comment,
      editableUntil
    });

    // Recompute item rating summary
    await recomputeItemRatings(itemId);

    return res.status(201).json({ success: true, review });
  } catch (err) {
    // If unique index violation bubbles up:
    if (err && err.code === 11000) {
      return res.status(409).json({ success: false, message: 'Review already exists for this booking' });
    }
    next(err);
  }
};

// Get single review by id
exports.getReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id)
      .populate('userId', 'name email') // adjust fields per your User model
      .populate('bookingId')
      .exec();

    if (!review || review.deleted) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    return res.json({ success: true, review });
  } catch (err) {
    next(err);
  }
};

// Get reviews for an item (paginated)
exports.getReviewsForItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    let { page = 1, pageSize = 10, sort = 'newest', rating } = req.query;
    page = parseInt(page, 10);
    pageSize = parseInt(pageSize, 10);

    const filter = { itemId, deleted: false };
    if (rating) {
      const r = parseInt(rating, 10);
      if (!isNaN(r) && r >= 1 && r <= 5) filter.rating = r;
    }

    const sortObj = {};
    if (sort === 'highest') sortObj.rating = -1;
    else if (sort === 'lowest') sortObj.rating = 1;
    else sortObj.createdAt = -1; // newest

    const total = await Review.countDocuments(filter).exec();
    const reviews = await Review.find(filter)
      .populate('userId', 'name') // include basics only
      .sort(sortObj)
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec();

    // Fetch current summary from Item (so client doesn't need to recompute)
    const item = await Item.findById(itemId).select('averageRating ratingsCount ratingsBreakdown').exec();

    return res.json({
      success: true,
      data: reviews,
      page,
      pageSize,
      total,
      averageRating: item ? item.averageRating || 0 : 0,
      ratingsCount: item ? item.ratingsCount || 0 : 0
    });
  } catch (err) {
    next(err);
  }
};

// Get review for a booking (one review per booking)
exports.getReviewForBooking = async (req, res, next) => {
  try {
    const { bookingId } = req.params;
    const review = await Review.findOne({ bookingId, deleted: false }).populate('userId', 'name').exec();
    if (!review) return res.status(404).json({ success: false, message: 'Review not found' });
    return res.json({ success: true, review });
  } catch (err) {
    next(err);
  }
};

// Update review
exports.updateReview = async (req, res, next) => {
  try {
    const userId = req.user && (req.user.id || req.user._id);
    const { id } = req.params;
    const { rating, title, comment } = req.body;

    const review = await Review.findById(id).exec();
    if (!review || review.deleted) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    // Ownership check
    if (String(review.userId) !== String(userId)) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this review' });
    }

    // Edit window check (3 days)
    const now = new Date();
    if (!review.editableUntil || now > new Date(review.editableUntil)) {
      return res.status(403).json({ success: false, message: 'Review can no longer be edited' });
    }

    // Apply updates
    let changed = false;
    if (rating !== undefined && review.rating !== rating) {
      review.rating = rating;
      changed = true;
    }
    if (title !== undefined && review.title !== title) {
      review.title = title;
      changed = true;
    }
    if (comment !== undefined && review.comment !== comment) {
      review.comment = comment;
      changed = true;
    }

    if (changed) {
      review.isEdited = true;
      review.updatedAt = new Date();
      await review.save();
      // Recompute item summary
      await recomputeItemRatings(review.itemId);
    }

    return res.json({ success: true, review });
  } catch (err) {
    next(err);
  }
};

// Soft-delete review
exports.deleteReview = async (req, res, next) => {
  try {
    const userId = req.user && (req.user.id || req.user._id);
    const { id } = req.params;

    const review = await Review.findById(id).exec();
    if (!review || review.deleted) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    // Allow owner or admin
    const isOwner = String(review.userId) === String(userId);
    const isAdmin = req.user && req.user.isAdmin; // assumes authMiddleware sets isAdmin where appropriate

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this review' });
    }

    review.deleted = true;
    await review.save();

    // Recompute item rating
    await recomputeItemRatings(review.itemId);

    return res.json({ success: true, message: 'Review deleted' });
  } catch (err) {
    next(err);
  }
};

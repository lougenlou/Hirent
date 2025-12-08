const { validationResult } = require('express-validator');
const Review = require('../models/Review');
const Item = require('../models/Item');

// Create review
exports.createReview = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { item, title, body, rating } = req.body;
    const user = req.user._id;

    const review = new Review({ item, user, title, body, rating });
    await review.save();

    // Recalculate average rating
    const stats = await Review.calculateItemRating(item);
    await Item.findByIdAndUpdate(item, {
      avgRating: stats.avgRating,
      ratingsCount: stats.count
    }).catch(() => {});

    return res.status(201).json(review);
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ message: 'User already reviewed this item' });
    next(err);
  }
};

// Get reviews (list)
exports.getReviews = async (req, res, next) => {
  try {
    const { item, page = 1, limit = 10, sort = '-createdAt' } = req.query;
    const filter = {};
    if (item) filter.item = item;

    const skip = (page - 1) * limit;
    const reviews = await Review.find(filter)
      .sort(sort)
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .populate('user', 'name email')
      .lean();

    const total = await Review.countDocuments(filter);
    return res.json({
      data: reviews,
      meta: { total, page: parseInt(page), limit: parseInt(limit), pages: Math.ceil(total / limit) }
    });
  } catch (err) { next(err); }
};

// Update review
exports.updateReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    const userId = req.user._id.toString();
    const isOwner = review.user.toString() === userId;
    const isAdmin = req.user.role === 'admin';
    if (!isOwner && !isAdmin) return res.status(403).json({ message: 'Not authorized' });

    const { title, body, rating } = req.body;
    if (title !== undefined) review.title = title;
    if (body !== undefined) review.body = body;
    if (rating !== undefined) review.rating = rating;

    await review.save();

    // Update average rating
    const stats = await Review.calculateItemRating(review.item);
    await Item.findByIdAndUpdate(review.item, {
      avgRating: stats.avgRating,
      ratingsCount: stats.count
    }).catch(() => {});

    res.json(review);
  } catch (err) { next(err); }
};

// Delete review
exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    const userId = req.user._id.toString();
    const isOwner = review.user.toString() === userId;
    const isAdmin = req.user.role === 'admin';
    if (!isOwner && !isAdmin) return res.status(403).json({ message: 'Not authorized' });

    await review.remove();

    // Update average rating
    const stats = await Review.calculateItemRating(review.item);
    await Item.findByIdAndUpdate(review.item, {
      avgRating: stats.avgRating,
      ratingsCount: stats.count
    }).catch(() => {});

    res.status(204).send();
  } catch (err) { next(err); }
};

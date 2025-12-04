const mongoose = require('mongoose');

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(String(id));
}

exports.validateCreateReview = (req, res, next) => {
  const { rating, bookingId, itemId, title, comment } = req.body;

  if (!rating && rating !== 0) {
    return res.status(400).json({ success: false, message: 'rating is required' });
  }

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return res.status(400).json({ success: false, message: 'rating must be an integer between 1 and 5' });
  }

  if (!bookingId || !isValidObjectId(bookingId)) {
    return res.status(400).json({ success: false, message: 'bookingId is required and must be a valid id' });
  }

  if (!itemId || !isValidObjectId(itemId)) {
    return res.status(400).json({ success: false, message: 'itemId is required and must be a valid id' });
  }

  if (title && title.length > 100) {
    return res.status(400).json({ success: false, message: 'title cannot exceed 100 characters' });
  }

  if (comment && comment.length > 2000) {
    return res.status(400).json({ success: false, message: 'comment cannot exceed 2000 characters' });
  }

  next();
};

exports.validateUpdateReview = (req, res, next) => {
  const { rating, title, comment } = req.body;

  if (rating !== undefined) {
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return res.status(400).json({ success: false, message: 'rating must be an integer between 1 and 5' });
    }
  }

  if (title && title.length > 100) {
    return res.status(400).json({ success: false, message: 'title cannot exceed 100 characters' });
  }

  if (comment && comment.length > 2000) {
    return res.status(400).json({ success: false, message: 'comment cannot exceed 2000 characters' });
  }

  next();
};

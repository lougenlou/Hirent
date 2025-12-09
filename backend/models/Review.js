const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true, index: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  title: { type: String, trim: true, maxlength: 120 },
  body: { type: String, trim: true, maxlength: 2000 },
  rating: { type: Number, required: true, min: 1, max: 5 }
}, { timestamps: true });

// Prevent a user from reviewing the same item twice
reviewSchema.index({ item: 1, user: 1 }, { unique: true });

// Helper to calculate average rating for an item
reviewSchema.statics.calculateItemRating = async function(itemId) {
  const agg = await this.aggregate([
    { $match: { item: mongoose.Types.ObjectId(itemId) } },
    { $group: { _id: '$item', avgRating: { $avg: '$rating' }, count: { $sum: 1 } } }
  ]);
  return agg[0] || { avgRating: null, count: 0 };
};

module.exports = mongoose.model('Review', reviewSchema);

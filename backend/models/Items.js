const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  images: [{ type: String }],
  pricePerDay: Number,
  available: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  // ⭐ REVIEW & RATING SUPPORT (ADDED)
  averageRating: { type: Number, default: 0 },     // For showing average 4.7 stars
  ratingsCount: { type: Number, default: 0 },      // Total number of reviews
  ratingsBreakdown: {                              // For rating bars UI
    1: { type: Number, default: 0 },
    2: { type: Number, default: 0 },
    3: { type: Number, default: 0 },
    4: { type: Number, default: 0 },
    5: { type: Number, default: 0 }
  }

}, { timestamps: true });

// TEXT INDEX
ItemSchema.index({ title: "text", description: "text" });

module.exports = mongoose.model("Item", ItemSchema);

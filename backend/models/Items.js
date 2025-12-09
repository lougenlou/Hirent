const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  images: [{ type: String }],
  pricePerDay: Number,
  available: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }

}, { timestamps: true });

//  TEXT INDEX 
ItemSchema.index({ title: "text", description: "text" });

module.exports = mongoose.model("Item", ItemSchema);

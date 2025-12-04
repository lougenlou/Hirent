const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  title: {
    type: String,
    maxlength: 100
  },
  comment: {
    type: String,
    maxlength: 2000
  },
  isEdited: {
    type: Boolean,
    default: false
  },
  editableUntil: {
    type: Date
  },
  deleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

// Enforce one review per user per booking
ReviewSchema.index({ userId: 1, bookingId: 1 }, { unique: true });

module.exports = mongoose.model('Review', ReviewSchema);

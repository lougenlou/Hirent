const mongoose = require('mongoose');

const PayoutRequestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true, min: 0.01 },
  method: { type: String, required: true }, // e.g., 'bank_transfer', 'paypal'
  details: { type: Object, default: {} }, // implementation-specific payout details
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'paid'],
    default: 'pending'
  },
  requestedAt: { type: Date, default: Date.now },
  processedAt: { type: Date },
  adminNote: { type: String, default: '' }
});

module.exports = mongoose.model('PayoutRequest', PayoutRequestSchema);
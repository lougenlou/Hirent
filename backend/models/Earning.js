const mongoose = require('mongoose');

const EarningSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true, min: 0 },
  source: { type: String, default: 'job' }, // e.g., 'job', 'bonus', 'referral'
  meta: { type: Object, default: {} }, // optional extra info (job id, invoice, etc.)
  createdAt: { type: Date, default: Date.now },
  settled: { type: Boolean, default: false } // optional: if the earning has been included in a payout
});

module.exports = mongoose.model('Earning', EarningSchema);
const PayoutRequest = require('../models/PayoutRequest');
const Earning = require('../models/Earning');
const User = require('../models/Users');

const MIN_PAYOUT = process.env.PAYOUT_MINIMUM ? Number(process.env.PAYOUT_MINIMUM) : 10; // default 10

// reuse computeBalance logic (import from earningsController or reimplement)
async function computeBalance(userId) {
  const earnedAgg = await Earning.aggregate([
    { $match: { user: userId } },
    { $group: { _id: null, totalEarned: { $sum: "$amount" } } }
  ]);
  const approvedPaidAgg = await PayoutRequest.aggregate([
    { $match: { user: userId, status: { $in: ['approved','paid'] } } },
    { $group: { _id: null, totalRequested: { $sum: "$amount" } } }
  ]);
  const totalEarned = (earnedAgg[0] && earnedAgg[0].totalEarned) || 0;
  const totalRequested = (approvedPaidAgg[0] && approvedPaidAgg[0].totalRequested) || 0;
  return totalEarned - totalRequested;
}

exports.requestPayout = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { amount, method, details } = req.body;

    if (!amount || !method) return res.status(400).json({ message: "amount and method are required" });
    if (amount < 0.01) return res.status(400).json({ message: "invalid amount" });

    const balance = await computeBalance(userId);
    if (amount > balance) return res.status(400).json({ message: "insufficient balance" });
    if (amount < MIN_PAYOUT) return res.status(400).json({ message: `minimum payout is ${MIN_PAYOUT}` });

    const payout = await PayoutRequest.create({
      user: userId,
      amount,
      method,
      details,
      status: 'pending'
    });

    // If you maintain earningsBalance on user, decrement it now (non-fatal)
    try {
      await User.findByIdAndUpdate(userId, { $inc: { earningsBalance: -amount } });
    } catch (err) {
      // ignore
    }

    res.status(201).json(payout);
  } catch (err) {
    next(err);
  }
};

exports.getUserPayouts = async (req, res, next) => {
  try {
    const userId = req.params.userId || req.user._id;
    const payouts = await PayoutRequest.find({ user: userId }).sort({ requestedAt: -1 });
    res.json(payouts);
  } catch (err) {
    next(err);
  }
};

// Admin functions
exports.getAllPayouts = async (req, res, next) => {
  try {
    const payouts = await PayoutRequest.find().populate('user', 'name email').sort({ requestedAt: -1 }).limit(200);
    res.json(payouts);
  } catch (err) {
    next(err);
  }
};

exports.updatePayoutStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, adminNote } = req.body;
    if (!['pending','approved','rejected','paid'].includes(status)) return res.status(400).json({ message: "invalid status" });

    const payout = await PayoutRequest.findById(id);
    if (!payout) return res.status(404).json({ message: "payout not found" });

    // only allow certain transitions? simple logic below:
    payout.status = status;
    payout.adminNote = adminNote || payout.adminNote;
    if (['approved','paid'].includes(status)) payout.processedAt = new Date();
    await payout.save();

    // If admin rejects, credit back user earningsBalance (if stored)
    if (status === 'rejected') {
      try {
        await User.findByIdAndUpdate(payout.user, { $inc: { earningsBalance: payout.amount } });
      } catch (err) { /* ignore */ }
    }

    res.json(payout);
  } catch (err) {
    next(err);
  }
};
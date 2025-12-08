const Earning = require('../models/Earning');
const PayoutRequest = require('../models/PayoutRequest');
const User = require('../models/Users'); // existing model

// utility: compute user available balance on the fly
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

exports.addEarning = async (req, res, next) => {
  try {
    const { user: userId, amount, source, meta } = req.body;

    if (!userId || !amount) return res.status(400).json({ message: "user and amount required" });

    const earning = await Earning.create({ user: userId, amount, source, meta });

    // If User model has earningsBalance, try to increment it (non-fatal if not present)
    try {
      await User.findByIdAndUpdate(userId, { $inc: { earningsBalance: amount } });
    } catch (err) {
      // ignore — fallback is compute on the fly
    }

    res.status(201).json(earning);
  } catch (err) {
    next(err);
  }
};

exports.getUserEarnings = async (req, res, next) => {
  try {
    const userId = req.params.userId || req.user._id;
    const earnings = await Earning.find({ user: userId }).sort({ createdAt: -1 });
    const balance = await computeBalance(userId);

    res.json({ earnings, balance });
  } catch (err) {
    next(err);
  }
};

exports.getAllEarnings = async (req, res, next) => {
  try {
    // admin use: pagination optional
    const earnings = await Earning.find().populate('user', 'name email').sort({ createdAt: -1 }).limit(100);
    res.json(earnings);
  } catch (err) {
    next(err);
  }
};
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "Users" },
  intentId: String,
  paymentId: String,
  amount: Number,
  description: String,
  status: { type: String, default: "pending" },
}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);

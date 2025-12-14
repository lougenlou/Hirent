const mongoose = require("mongoose");

/*
  Payment Schema

  This schema stores payment records created BEFORE redirecting
  the user to PayMongo checkout, and is later updated via webhooks.

  IMPORTANT:
  - Amount is stored in centavos (PHP)
  - No sensitive payment data (card numbers, GCash accounts) is stored
  - Final payment confirmation must come from PayMongo webhooks
*/

const paymentSchema = new mongoose.Schema(
  {
    // User who initiated the payment
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      required: true,
    },

    // to have a relationship with Booking
    bookingId: {
      type: mongoose.Types.ObjectId,
      ref: "Booking",
      required: true,
    },

    // PayMongo Checkout Session ID (used for GCash and hosted checkout)
    checkoutSessionId: {
      type: String,
    },

    // PayMongo Payment Intent ID (optional, for advanced/custom flows)
    intentId: {
      type: String,
    },

    // Final PayMongo Payment ID (available after successful payment)
    paymentId: {
      type: String,
    },

    // Payment amount in centavos (e.g., 50000 = PHP 500.00)
    amount: {
      type: Number,
      required: true,
    },

    // Currency code
    currency: {
      type: String,
      default: "PHP",
    },

    // Payment provider (e.g., "gcash", "card")
    provider: {
      type: String,
      required: true,
    },

    // Description of what the payment is for
    description: {
      type: String,
    },

    // Current payment status
    status: {
      type: String,
      enum: ["pending", "paid", "failed", "expired"],
      default: "pending",
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

module.exports = mongoose.model("Payment", paymentSchema);

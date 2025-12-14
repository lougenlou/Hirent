const axios = require("axios");
const Payment = require("../models/Payment");
const User = require("../models/Users"); // needed for email
const { sendEmail } = require('../utils/emailService');

// Load secret key from environment
const PAYMONGO_SECRET = process.env.PAYMONGO_SECRET_KEY;

if (!PAYMONGO_SECRET) {
  throw new Error("PAYMONGO_SECRET_KEY is not defined in your .env file");
}

// Encode key for Basic Auth
const authHeader = `Basic ${Buffer.from(PAYMONGO_SECRET + ":").toString("base64")}`;

// Axios instance for PayMongo API
const api = axios.create({
  baseURL: "https://api.paymongo.com/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: authHeader,
  },
});

/* -------------------------
   CREATE PAYMENT INTENT (CARD / ADVANCED)
-------------------------- */
exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount, description, userId } = req.body;

    const response = await api.post("/payment_intents", {
      data: {
        attributes: {
          amount: amount * 100, // convert to centavos
          currency: "PHP",
          description,
          payment_method_allowed: ["gcash", "card"],
        },
      },
    });

    const intent = response.data.data;

    await Payment.create({
      userId,
      intentId: intent.id,
      amount,
      description,
      status: "pending",
      provider: "card", // default for payment intent
    });

    res.json({
      success: true,
      intentId: intent.id,
      clientKey: intent.attributes.client_key,
    });
  } catch (err) {
    console.log(err?.response?.data || err);
    res.status(500).json({ error: err?.response?.data || err });
  }
};

/* -------------------------
   ATTACH PAYMENT METHOD (CARD)
-------------------------- */
exports.attachPaymentMethod = async (req, res) => {
  try {
    const { intentId, paymentMethodId } = req.body;

    const response = await api.post(`/payment_intents/${intentId}/attach`, {
      data: {
        attributes: {
          payment_method: paymentMethodId,
        },
      },
    });

    res.json({ success: true, ...response.data });
  } catch (err) {
    res.status(500).json({ error: err?.response?.data || err });
  }
};

/* -------------------------
   CREATE GCash CHECKOUT SESSION
-------------------------- */
exports.createGCashCheckout = async (req, res) => {
  try {
    const { amount, description, bookingId } = req.body; // <-- added bookingId

    if (!amount || amount <= 0)
      return res.status(400).json({ message: "Invalid amount" });

    // 1. Create local payment record
    const paymentData = {
      userId: req.user.userId, // fixed to match auth middleware
      amount,
      currency: "PHP",
      provider: "gcash",
      description,
      status: "pending",
    };

    if (bookingId) paymentData.bookingId = bookingId; // <-- LINK PAYMENT TO BOOKING

    const payment = await Payment.create(paymentData);

    // 2. Create PayMongo checkout session
    const response = await api.post("/checkout/sessions", {
      data: {
        attributes: {
          payment_method_types: ["gcash"],
          send_email_receipt: false,
          description: description || "Payment",
          line_items: [
            { name: "Payment", amount, currency: "PHP", quantity: 1 },
          ],
        },
      },
    });

    const checkoutSessionId = response.data.data.id;
    const checkoutUrl = response.data.data.attributes.checkout_url;

    // 3. Save checkout session ID
    await Payment.findByIdAndUpdate(payment._id, { checkoutSessionId });

    // 4. Return checkout URL to frontend
    res.status(200).json({ checkoutUrl, paymentId: payment._id });
  } catch (error) {
    console.error("GCash Checkout Error:", error.response?.data || error.message);
    res.status(500).json({ message: "Failed to create GCash checkout" });
  }
};

/* -------------------------
   PAYMONGO WEBHOOK HANDLER
-------------------------- */
exports.paymongoWebhook = async (req, res) => {
  try {
    const event = req.body;

    if (!event || !event.data || !event.data.attributes)
      return res.sendStatus(400);

    const eventType = event.data.attributes.type;
    const data = event.data.attributes.data;

    // Handle Checkout Session payments
    if (eventType === "checkout_session.payment.paid") {
      const checkoutSessionId = data.id;
      const paymentIdFromPayMongo = data.attributes.payment_intent?.id;

      const payment = await Payment.findOneAndUpdate(
        { checkoutSessionId },
        { status: "paid", paymentId: paymentIdFromPayMongo },
        { new: true }
      );

      // Optional: send email
      if (payment) {
        const user = await User.findById(payment.userId);
        if (user) {
          await sendEmail(
            user.email,
            "Payment Successful",
            `<p>Your payment of ₱${payment.amount} for <strong>${payment.description}</strong> was successful!</p>
             <p>Payment ID: ${payment.paymentId}</p>`
          );
        }
      }
    }

    // Handle failed or expired payments
    if (["checkout_session.payment.failed", "checkout_session.expired"].includes(eventType)) {
      const checkoutSessionId = data.id;
      await Payment.findOneAndUpdate(
        { checkoutSessionId },
        { status: "failed" }
      );
    }

    // Optional: handle Payment Intent (card) payments
    if (eventType === "payment.paid") {
      const paymentData = data;
      const intentId = paymentData.attributes.payment_intent_id;

      const payment = await Payment.findOneAndUpdate(
        { intentId },
        { status: "paid", paymentId: paymentData.id },
        { new: true }
      );

      if (payment) {
        const user = await User.findById(payment.userId);
        if (user) {
          await sendEmail(
            user.email,
            "Payment Successful",
            `<p>Your payment of ₱${payment.amount} for <strong>${payment.description}</strong> was successful!</p>
             <p>Payment ID: ${payment.paymentId}</p>`
          );
        }
      }
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("PayMongo Webhook Error:", error);
    res.status(500).send("Webhook Error");
  }
};

const axios = require("axios");
const Payment = require("../models/Payment");
const { sendEmail } = require('../utils/emailService');

// Load secret key from environment
const PAYMONGO_SECRET = process.env.PAYMONGO_SECRET_KEY;

if (!PAYMONGO_SECRET) {
  throw new Error("PAYMONGO_SECRET_KEY is not defined in your .env file");
}

// Encode key for Basic Auth
const authHeader = `Basic ${Buffer.from(PAYMONGO_SECRET).toString("base64")}`;

// Axios instance for PayMongo API
const api = axios.create({
  baseURL: "https://api.paymongo.com/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: authHeader,
  },
});


// CREATE PAYMENT INTENT
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

// ATTACH PAYMENT METHOD
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


// PAYMONGO WEBHOOK
exports.paymongoWebhook = async (req, res) => {
  try {
    const event = req.body.data;

    if (event.type === "payment.paid") {
      const paymentData = event.attributes.data;
      const intentId = paymentData.attributes.payment_intent_id;

      // Update payment and return the updated document
      const payment = await Payment.findOneAndUpdate(
        { intentId },
        {
          status: "paid",
          paymentId: paymentData.id,
        },
        { new: true } // <--- returns the updated document
      );

      // Send email if payment exists
      if (payment) {
        const user = await User.findById(payment.userId);
        if (user) {
          await sendEmail(
            user.email,
            "Payment Successful",
            `<p>Your payment of ₱${payment.amount} for <strong>${payment.description}</strong> was successful!</p>
             <p>Payment ID: ${payment.intentId}</p>`
          );
        }
      }
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("PayMongo Webhook Error:", error);
    res.status(400).send("Webhook Error");
  }
};
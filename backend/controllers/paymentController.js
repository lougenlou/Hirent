const axios = require("axios");
const Payment = require("../models/Payment");

const PAYMONGO_SECRET = process.env.PAYMONGO_SECRET_KEY;
const authHeader = `Basic ${Buffer.from(PAYMONGO_SECRET).toString("base64")}`;

const api = axios.create({
  baseURL: "https://api.paymongo.com/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: authHeader,
  },
});

// ========================================================
// Create Payment Intent
// ========================================================
exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount, description, userId } = req.body;

    const response = await api.post("/payment_intents", {
      data: {
        attributes: {
          amount: amount * 100, // centavos
          currency: "PHP",
          description,
          payment_method_allowed: ["gcash", "card"],
        }
      }
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
    console.log(err?.response?.data);
    res.status(500).json({ error: err?.response?.data || err });
  }
};


// ========================================================
// Attach Payment Method
// ========================================================
exports.attachPaymentMethod = async (req, res) => {
  try {
    const { intentId, paymentMethodId } = req.body;

    const response = await api.post(`/payment_intents/${intentId}/attach`, {
      data: {
        attributes: {
          payment_method: paymentMethodId,
        }
      }
    });

    res.json({ success: true, ...response.data });

  } catch (err) {
    res.status(500).json({ error: err?.response?.data || err });
  }
};


// ========================================================
// Webhook Handler
// ========================================================
exports.paymongoWebhook = async (req, res) => {
  try {
    const event = req.body.data;

    if (event.type === "payment.paid") {
      const paymentData = event.attributes.data;
      const intentId = paymentData.attributes.payment_intent_id;

      await Payment.findOneAndUpdate(
        { intentId },
        {
          status: "paid",
          paymentId: paymentData.id
        }
      );
    }

    res.sendStatus(200);
  } catch (error) {
    res.status(400).send("Webhook Error");
  }
};

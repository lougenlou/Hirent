const express = require("express");
const {
  createPaymentIntent,
  attachPaymentMethod,
  paymongoWebhook
} = require("../controllers/paymentController");

const router = express.Router();

router.post("/create-intent", createPaymentIntent);
router.post("/attach-method", attachPaymentMethod);

// IMPORTANT: Allow raw body for webhook
router.post("/webhook", express.json({ type: "*/*" }), paymongoWebhook);

module.exports = router;

const express = require("express");
const {
  createPaymentIntent,
  attachPaymentMethod,
  paymongoWebhook,
  createGCashCheckout, 
} = require("../controllers/paymentController");

const router = express.Router();

router.post("/create-intent", createPaymentIntent);
router.post("/attach-method", attachPaymentMethod);
router.post("/create-gcash", createGCashCheckout); // GCash checkout

// WEBHOOK
router.post("/webhook", express.json({ type: "*/*" }), paymongoWebhook);

module.exports = router;
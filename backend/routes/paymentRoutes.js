const express = require("express");
const {
  createPaymentIntent,
  attachPaymentMethod,
  paymongoWebhook
} = require("../controllers/paymentController");

const router = express.Router();

router.post("/create-intent", createPaymentIntent);
router.post("/attach-method", attachPaymentMethod);

//WEBHOOK
router.post("/webhook", express.json({ type: "*/*" }), paymongoWebhook);

module.exports = router;

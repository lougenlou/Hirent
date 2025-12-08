const express = require('express');
const router = express.Router();
const payoutController = require('../controllers/payoutController');
const auth = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/roles');

// User requests a payout
router.post('/request', auth.protect, payoutController.requestPayout);

// User gets their payouts
router.get('/me', auth.protect, payoutController.getUserPayouts);

// Admin: list payouts
router.get('/', auth.protect, isAdmin, payoutController.getAllPayouts);

// Admin: update payout status
router.patch('/:id', auth.protect, isAdmin, payoutController.updatePayoutStatus);

module.exports = router;
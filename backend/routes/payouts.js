const express = require('express');
const router = express.Router();
const payoutController = require('../controllers/payoutController');
const auth = require('../middleware/auth');
const { isAdmin } = require('../middleware/roles');

// User requests a payout
router.post('/request', auth, payoutController.requestPayout);

// User gets their payouts
router.get('/me', auth, payoutController.getUserPayouts);

// Admin: list payouts
router.get('/', auth, isAdmin, payoutController.getAllPayouts);

// Admin: update payout status
router.patch('/:id', auth, isAdmin, payoutController.updatePayoutStatus);

module.exports = router;
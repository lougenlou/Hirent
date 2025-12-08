const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getPendingNotifications, sendNotification } = require('../controllers/notificationController');

// Get all bookings with pending notifications (admin)
router.get('/pending', auth, getPendingNotifications);

// Send notification for a booking
router.post('/:id/send', auth, sendNotification);

module.exports = router;
const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendarController');
const authMiddleware = require('../middleware/authMiddleware');

// Renter calendar
router.get('/events/renter', authMiddleware, calendarController.getRenterEvents);

// Owner calendar
router.get('/events/owner', authMiddleware, calendarController.getOwnerEvents);

// Get single event
router.get('/events/:id', authMiddleware, calendarController.getEventById);

module.exports = router;

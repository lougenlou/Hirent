const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { validateCreateReview, validateUpdateReview } = require('../middleware/validators/reviewValidator');
const auth = require('../middleware/authMiddleware'); // assumes you have this

// Create review (auth required)
router.post('/', auth, validateCreateReview, reviewController.createReview);

// Get a single review by id
router.get('/:id', reviewController.getReview);

// Update review
router.put('/:id', auth, validateUpdateReview, reviewController.updateReview);

// Delete review (soft)
router.delete('/:id', auth, reviewController.deleteReview);

// Get reviews for item (mounted at /api/reviews/items/:itemId or use items routes)
router.get('/items/:itemId', reviewController.getReviewsForItem);

// Get review for a booking (one-per-booking)
router.get('/bookings/:bookingId', auth, reviewController.getReviewForBooking);

// Export
module.exports = router;

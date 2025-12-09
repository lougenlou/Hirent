const express = require('express');
const { body, param, query } = require('express-validator');
const reviewController = require('../controllers/reviewController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// Create review
router.post(
  '/',
  auth,
  [
    body('item').isMongoId().withMessage('item is required'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('rating must be 1-5'),
    body('title').optional().isString().isLength({ max: 120 }),
    body('body').optional().isString().isLength({ max: 2000 })
  ],
  reviewController.createReview
);

// Get list of reviews
router.get(
  '/',
  [
    query('item').optional().isMongoId(),
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 100 }),
  ],
  reviewController.getReviews
);

// Update review
router.put(
  '/:id',
  auth,
  [
    param('id').isMongoId(),
    body('rating').optional().isInt({ min: 1, max: 5 }),
    body('title').optional().isString().isLength({ max: 120 }),
    body('body').optional().isString().isLength({ max: 2000 })
  ],
  reviewController.updateReview
);

// Delete review
router.delete('/:id', auth, reviewController.deleteReview);

module.exports = router;

const express = require('express');
const router = express.Router();

const auth = require('../middleware/authMiddleware');

const {
  createBookingValidator,
  cancelBookingValidator,
  updateBookingStatusValidator,
} = require('../validators/bookingValidators');

const {
  createBooking,
  getMyBookings,
  cancelBooking,
  getBookingsForMyItems,
  updateBookingStatus,
  getBookingById,
} = require('../controllers/bookingController');


// RENTER ROUTES
// Create booking
router.post(
  '/',
  auth.protect,
  ...createBookingValidator,
  createBooking
);

// Get my bookings (renter)
router.get(
  '/me',
  auth.protect,
  getMyBookings
);

// Cancel booking
router.put(
  '/:id/cancel',
  auth.protect,
  ...cancelBookingValidator,
  cancelBooking
);

// OWNER ROUTES
// Get bookings for items I own
router.get(
  '/owner',
  auth.protect,
  getBookingsForMyItems
);

// Owner approve/reject booking
router.put(
  '/:id/status',
  auth.protect,
  ...updateBookingStatusValidator,
  updateBookingStatus
);


// GENERAL ROUTE
// Single booking details
router.get(
  '/:id',
  auth.protect,
  getBookingById
);

module.exports = router;

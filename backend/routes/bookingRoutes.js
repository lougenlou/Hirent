const express = require('express');
const router = express.Router();

const auth = require('../middleware/authMiddleware');
const validationHandler = require('../validators/validationHandler');

const {
  createBookingValidator,
  cancelBookingValidator,
  updateBookingStatusValidator,
} = require('../validators/bookingValidator');

const {
  createBooking,
  getMyBookings,
  cancelBooking,
  getBookingsForMyItems,
  updateBookingStatus,
  getBookingById,
  getBookingsForItem,
  getBookingPaymentStatus, // NEW: import the payment status function
} = require('../controllers/bookingController');

// ============================
// RENTER ROUTES
// ============================

// Create booking
router.post(
  '/',
  auth,
  createBookingValidator,
  validationHandler,
  createBooking
);

// Get my bookings (renter)
router.get(
  '/me',
  auth,
  getMyBookings
);

// Get bookings for item
router.get(
  '/item/:itemId',
  auth,
  getBookingsForItem
);

// Cancel booking
router.put(
  '/:id/cancel',
  auth,
  cancelBookingValidator,
  validationHandler,
  cancelBooking
);

// Poll payment status for a booking (NEW)
router.get(
  '/:id/payment-status',
  auth,
  getBookingPaymentStatus
);

// GET /bookings/:id/payment-status
router.get("/:id/payment-status", auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });

    // Return payment status (pending, paid, failed)
    res.json({
      success: true,
      data: { paymentStatus: booking.paymentStatus || "pending" },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


// ============================
// OWNER ROUTES
// ============================

// Get bookings for items I own
router.get(
  '/owner',
  auth,
  getBookingsForMyItems
);

// Owner approve/reject booking
router.put(
  '/:id/status',
  auth,
  updateBookingStatusValidator,
  validationHandler,
  updateBookingStatus
);

// ============================
// GENERAL ROUTE
// ============================

// Single booking details
router.get(
  '/:id',
  auth,
  getBookingById
);

module.exports = router;

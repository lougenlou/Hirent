const { body, param, validationResult } = require('express-validator');

// Middleware to handle validation results
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};


// CREATE BOOKING VALIDATOR
const createBookingValidator = [
  body('item')
    .notEmpty()
    .withMessage('Item ID is required')
    .isMongoId()
    .withMessage('Invalid Item ID'),

  body('startDate')
    .notEmpty()
    .withMessage('Start date is required')
    .isISO8601()
    .toDate()
    .withMessage('Start date must be a valid date'),

  body('endDate')
    .notEmpty()
    .withMessage('End date is required')
    .isISO8601()
    .toDate()
    .withMessage('End date must be a valid date')
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.startDate)) {
        throw new Error('End date must be after start date');
      }
      return true;
    }),

  validate,
];


// CANCEL BOOKING VALIDATOR
const cancelBookingValidator = [
  param('id')
    .notEmpty()
    .withMessage('Booking ID is required')
    .isMongoId()
    .withMessage('Invalid Booking ID'),

  validate,
];


// UPDATE BOOKING STATUS VALIDATOR
const updateBookingStatusValidator = [
  param('id')
    .notEmpty()
    .withMessage('Booking ID is required')
    .isMongoId()
    .withMessage('Invalid Booking ID'),

  body('status')
    .notEmpty()
    .withMessage('Status is required')
    .isIn(['pending', 'approved', 'rejected', 'cancelled'])
    .withMessage('Status must be one of: pending, approved, rejected, cancelled'),

  validate,
];

module.exports = {
  createBookingValidator,
  cancelBookingValidator,
  updateBookingStatusValidator,
};

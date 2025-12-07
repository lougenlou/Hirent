const { body } = require('express-validator');

exports.itemValidation = [
  body('name')
    .notEmpty().withMessage('Item name is required'),

  body('price')
    .notEmpty().withMessage('Price is required')
    .isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),

  body('description')
    .notEmpty().withMessage('Description is required')
    .isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),

  body('category')
    .notEmpty().withMessage('Category is required')
];

const express = require('express');
const router = express.Router();
const earningsController = require('../controllers/earningsController');
const auth = require('../middleware/authMiddleware'); 
const { isAdmin } = require('../middleware/roles'); 
const { param } = require('express-validator');
const { validationResult } = require('express-validator');

// Middleware to handle validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Add an earning (admin or system)
router.post('/', auth.protect, isAdmin, earningsController.addEarning);

// Get logged in user's earnings
router.get('/me', auth.protect, earningsController.getUserEarnings);

// Get earnings for a specific user (admin)
router.get('/user/:userId', auth.protect, isAdmin, earningsController.getUserEarnings);

// Get all earnings (admin)
router.get('/', auth.protect, isAdmin, earningsController.getAllEarnings);

module.exports = router;
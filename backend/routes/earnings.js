const express = require('express');
const router = express.Router();
const earningsController = require('../controllers/earningsController');
const auth = require('../middleware/auth'); // assumes you have an auth middleware
const { isAdmin } = require('../middleware/roles'); // we'll provide isAdmin below

// Add an earning (admin or system)
router.post('/', auth, isAdmin, earningsController.addEarning);

// Get logged in user's earnings
router.get('/me', auth, earningsController.getUserEarnings);

// Get earnings for a specific user (admin)
router.get('/user/:userId', auth, isAdmin, earningsController.getUserEarnings);

// Get all earnings (admin)
router.get('/', auth, isAdmin, earningsController.getAllEarnings);

module.exports = router;
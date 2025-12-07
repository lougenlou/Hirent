const express = require('express');
const router = express.Router();
const { getPersonalizedHome } = require('../controllers/homeController');
const auth = require('../middleware/authMiddleware');

router.get('/personalized', auth, getPersonalizedHome);

module.exports = router;

const express = require('express');
const router = express.Router();
const { getHomePageData } = require('./api/homepage/homepage.controller');

// @desc    Get homepage data (featured items, categories, why choose, etc.)
router.get('/', getHomePageData);

module.exports = router;
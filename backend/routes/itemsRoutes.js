const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemController');

router.get('/search', itemsController.searchItems);
router.get('/items', itemsController.getAllItems);
router.post('/items', itemsController.createItem);                   

module.exports = router;

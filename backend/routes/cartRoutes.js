const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  addToCart,
  removeFromCart,
  updateCartItem,
  getCart
} = require('../controllers/cartController');

// /api/cart/add
router.post('/add', auth.protect, addToCart);

// /api/cart/remove/:itemId
router.delete('/remove/:itemId', auth.protect, removeFromCart);

// /api/cart/update
router.put('/update', auth.protect, updateCartItem);

// /api/cart
router.get('/', auth.protect, getCart);

module.exports = router;

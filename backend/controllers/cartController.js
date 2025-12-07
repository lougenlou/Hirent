const Cart = require('../models/Cart');

// =========================
// Add item to cart
// =========================
exports.addToCart = async (req, res) => {
  const userId = req.user.id;
  const { itemId, quantity } = req.body;

  if (!itemId || !quantity) {
    return res.status(400).json({ msg: 'itemId and quantity are required' });
  }

  try {
    let cart = await Cart.findOne({ userId });

    // Create cart if it doesn't exist
    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ itemId, quantity }],
      });
      await cart.save();
      return res.status(201).json(cart);
    }

    // If item exists, increase quantity
    const existingItem = cart.items.find((item) => item.itemId === itemId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      // Add new item
      cart.items.push({ itemId, quantity });
    }

    await cart.save();
    res.json(cart);

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};


// =========================
// Remove item from cart
// =========================
exports.removeFromCart = async (req, res) => {
  const userId = req.user.id;
  const { itemId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ msg: 'Cart not found' });

    cart.items = cart.items.filter((item) => item.itemId !== itemId);

    await cart.save();
    res.json(cart);

  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};


// =========================
// Update item quantity
// =========================
exports.updateCartItem = async (req, res) => {
  const userId = req.user.id;
  const { itemId, quantity } = req.body;

  if (!itemId || !quantity) {
    return res.status(400).json({ msg: 'itemId and quantity are required' });
  }

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ msg: 'Cart not found' });

    const item = cart.items.find((item) => item.itemId === itemId);
    if (!item) return res.status(404).json({ msg: 'Item not found in cart' });

    item.quantity = quantity;

    await cart.save();
    res.json(cart);

  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};


// =========================
// Fetch user cart
// =========================
exports.getCart = async (req, res) => {
  const userId = req.user.id;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // If no cart exists yet, return an empty one
      return res.json({ userId, items: [] });
    }

    res.json(cart);

  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

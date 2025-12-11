const Wishlist = require("../models/wishlist.model");
const Item = require("../models/Items");

// ADD ITEM TO WISHLIST
exports.addToWishlist = async (req, res) => {
  try {
    const userId = req.user.userId; // auth middleware
    const { itemId } = req.body;

    // Check if item exists
    const itemExists = await Item.findById(itemId);
    if (!itemExists) return res.status(404).json({ message: "Item not found" });

    // Find or create wishlist for this user
    let wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      wishlist = new Wishlist({ userId, items: [itemId] });
    } else {
      if (wishlist.items.includes(itemId)) {
        return res.status(400).json({ message: "Item already in wishlist" });
      }
      wishlist.items.push(itemId);
    }

    // Save the wishlist
    await wishlist.save();

    // Populate items for response
    const populatedWishlist = await wishlist.populate("items");

    return res.status(201).json({
      message: "Item added to wishlist",
      wishlist: populatedWishlist,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



// REMOVE ITEM FROM WISHLIST
exports.removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { itemId } = req.params;

    // Find the user's wishlist
    const wishlist = await Wishlist.findOne({ userId });
    if (!wishlist || !wishlist.items.includes(itemId)) {
      return res.status(404).json({ message: "Item not found in wishlist" });
    }

    // Remove the item
    wishlist.items = wishlist.items.filter(id => id.toString() !== itemId);
    await wishlist.save();

    const populatedWishlist = await wishlist.populate("items");

    return res.json({
      message: "Item removed from wishlist",
      wishlist: populatedWishlist,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// GET USER WISHLIST
exports.getWishlist = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Find wishlist for the user
    let wishlist = await Wishlist.findOne({ userId }).populate("items");

    if (!wishlist) {
      // If user has no wishlist yet, return empty array
      wishlist = { items: [] };
    }

    return res.json(wishlist);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

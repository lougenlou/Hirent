const express = require("express");
const router = express.Router();
const { addToWishlist, removeFromWishlist, getWishlist } = require("../controllers/wishlistController");
const { protect } = require("../middleware/authMiddleware");

// Routes
router.post("/", protect, addToWishlist);
router.delete("/:itemId", protect, removeFromWishlist);
router.get("/", protect, getWishlist);

module.exports = router;

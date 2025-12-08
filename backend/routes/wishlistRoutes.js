const express = require("express");
const router = express.Router();
const {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} = require("../controllers/wishlistController");
const { protect } = require("../middleware/authMiddleware");

console.log("addToWishlist:", addToWishlist);
console.log("protect:", protect);


router.post("/add", protect, addToWishlist);
router.delete("/remove/:itemId", protect, removeFromWishlist);
router.get("/", protect, getWishlist);

module.exports = router;

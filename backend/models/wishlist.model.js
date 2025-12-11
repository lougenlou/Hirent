const mongoose = require("mongoose");

// Prevent model overwrite errors in dev
if (mongoose.connection.models["Wishlist"]) {
  delete mongoose.connection.models["Wishlist"];
}

const WishlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Wishlist", WishlistSchema);

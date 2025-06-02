// wishlistController.js

const User = require("../models/userModel");
const Product = require("../models/productModel");

exports.AddToWishlist = async (req, res) => {
  try {
    const userId = req.user.id; // assuming you have user ID from auth middleware
    const { productId } = req.body;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if product is already in wishlist
    if (user.wishlist.includes(productId)) {
      return res.status(400).json({ message: "Product already in wishlist" });
    }

    // Add to wishlist
    user.wishlist.push(productId);
    await user.save();

    return res
      .status(200)
      .json({ message: "Product added to wishlist", wishlist: user.wishlist });
  } catch (error) {
    console.error("Add to wishlist error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.GetWishlist = async (req, res) => {
  try {
    const userId = req.user.id; // assuming req.user is set after auth middleware

    const user = await User.findById(userId).populate("wishlist");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ wishlist: user.wishlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.RemoveFromWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.wishlist = user.wishlist.filter(
      (id) => id.toString() !== productId.toString()
    );
    await user.save();

    return res.status(200).json({
      message: "Removed from wishlist",
      wishlist: user.wishlist,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

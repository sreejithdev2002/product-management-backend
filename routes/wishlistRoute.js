const express = require("express");
const protect = require("../middlewares/authMiddleware");
const {
  AddToWishlist,
  GetWishlist,
  RemoveFromWishlist,
} = require("../controllers/wishlistController");
const router = express.Router();

router.post("/add", protect, AddToWishlist);
router.get("/get", protect, GetWishlist);
router.post("/remove", protect, RemoveFromWishlist);

module.exports = router;

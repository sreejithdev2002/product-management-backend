const express = require("express");
const {
  CreateCategory,
  GetCategories,
} = require("../controllers/categoryController");
const protect = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create-category", protect, CreateCategory);
router.get("/get-category", GetCategories);

module.exports = router;

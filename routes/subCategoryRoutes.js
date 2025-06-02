const express = require("express");
const { createSubCategory, getSubCategories } = require("../controllers/subCategoryController");
const protect = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create-sub-category", protect, createSubCategory);
router.get("/get-sub-category", getSubCategories)

module.exports = router;

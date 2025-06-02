const express = require("express");
const {
  CreateProduct,
  GetProducts,
  UpdateProduct,
  GetSingleProduct,
} = require("../controllers/productController");
const upload = require("../middlewares/upload");
const protect = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create-product", protect, upload.array("images", 3), CreateProduct);
router.get("/get-products", GetProducts);
router.put("/edit-product/:id", protect, upload.array("images", 3), UpdateProduct);
router.get("/product/:id", GetSingleProduct);

module.exports = router;

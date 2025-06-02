require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const subCategoryRoutes = require("./routes/subCategoryRoutes");
const productRoutes = require("./routes/productRoutes");
const wishlistRoutes = require("./routes/wishlistRoute");

connectDB();

// const corsOptions = {
//   origin: "https://product-management-frontend-ruby.vercel.app", // Replace with your actual Vercel frontend URL
//   credentials: true,
// };

// app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/sub-category", subCategoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/wishlist", wishlistRoutes);

app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

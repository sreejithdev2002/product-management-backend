const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },
    variants: [
      {
        ram: String,
        price: Number,
        quantity: Number,
      },
    ],
    images: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);

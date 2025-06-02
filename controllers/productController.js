const Product = require("../models/productModel");

exports.CreateProduct = async (req, res) => {
  try {
    const { title, variants, subCategory, description } = req.body;
    const imagePaths = req.files.map((file) => file.path);
    const parsedVariants = JSON.parse(variants); // parsed from stringified array

    const product = await Product.create({
      title,
      variants: parsedVariants,
      subCategory,
      description,
      images: imagePaths,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ MODIFIED: GetProducts with pagination
exports.GetProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const skip = (page - 1) * limit;

    const totalProducts = await Product.countDocuments();
    const products = await Product.find()
      .populate("subCategory")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // Optional sorting

    const totalPages = Math.ceil(totalProducts / limit);

    res.status(200).json({
      products,
      currentPage: page,
      totalPages,
      totalProducts,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// exports.UpdateProduct = async (req, res) => {
//   try {
//     const { title, description, subCategory, variants } = req.body;
//     const { id } = req.params;

//     const product = await Product.findById(id);
//     if (!product) return res.status(404).json({ error: "Product not found" });

//     // Update fields if provided
//     if (title) product.title = title;
//     if (description) product.description = description;
//     if (subCategory) product.subCategory = subCategory;
//     if (variants) product.variants = JSON.parse(variants); // parsed from string

//     // If new images uploaded, add them to existing images (max 3 total)
//     if (req.files.length > 0) {
//       const newImagePaths = req.files.map(
//         (file) => `uploads/${file.filename}`
//       );
//       product.images = [...product.images, ...newImagePaths].slice(0, 3); // max 3 images
//     }

//     const updatedProduct = await product.save();
//     res.json(updatedProduct);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

exports.UpdateProduct = async (req, res) => {
    try {
      const { title, description, subCategory, variants } = req.body;
      const { id } = req.params;
  
      const product = await Product.findById(id);
      if (!product) return res.status(404).json({ error: "Product not found" });
  
      // Update fields if provided
      if (title) product.title = title;
      if (description) product.description = description;
      if (subCategory) product.subCategory = subCategory;
      if (variants) product.variants = JSON.parse(variants);
  
      // Handle new images (limit to 3)
      if (req.files.length > 0) {
        const newImagePaths = req.files.map(
          (file) => `uploads/${file.filename}`
        );
  
        // Combine old + new, but only keep 3
        const combinedImages = [...product.images, ...newImagePaths].slice(0, 3);
  
        // Find which old images were removed
        const removedImages = product.images.filter(
          (img) => !combinedImages.includes(img)
        );
  
        // Delete removed images from the filesystem
        for (const imgPath of removedImages) {
          const fullPath = path.join(__dirname, "../", imgPath);
          fs.unlink(fullPath, (err) => {
            if (err) console.error("Failed to delete image:", imgPath, err);
          });
        }
  
        // Update image array
        product.images = combinedImages;
      }
  
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

exports.GetSingleProduct = async (req, res) => {
    try {
      const { id } = req.params; // get product id from URL params
  
      const product = await Product.findById(id).populate("subCategory");
  
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
  
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
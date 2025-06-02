const SubCategory = require("../models/subCategoryModel");

exports.createSubCategory = async (req, res) => {
    try {
      const subCategory = await SubCategory.create(req.body);
      res.status(201).json(subCategory);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.getSubCategories = async (req, res) => {
    try {
      const subCategories = await SubCategory.find().populate("category");
      res.json(subCategories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
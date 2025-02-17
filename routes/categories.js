const express = require("express");
const Category = require("../models/Category");

const router = express.Router();

// Fetch all top-level categories (Main Cards)
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find({}).populate("subcategories");
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

// Fetch subcategories of a given category
router.get("/:categoryId", async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId).populate(
      "subcategories"
    );
    if (!category) return res.status(404).json({ error: "Category not found" });

    res.json(category.subcategories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch subcategories" });
  }
});

// Add a new category
router.post("/", async (req, res) => {
  const { name, slug, parentCategoryId } = req.body;

  try {
    const newCategory = new Category({ name, slug });
    await newCategory.save();

    // If it's a subcategory, add it to the parent category
    if (parentCategoryId) {
      const parentCategory = await Category.findById(parentCategoryId);
      if (!parentCategory)
        return res.status(404).json({ error: "Parent category not found" });

      parentCategory.subcategories.push(newCategory._id);
      await parentCategory.save();
    }

    res.json({ message: "Category added successfully", category: newCategory });
  } catch (error) {
    res.status(400).json({ error: "Error adding category" });
  }
});

module.exports = router;

const express = require("express");
const Subcategory = require("../models/Subcategory");

const router = express.Router();

// Get all subcategories under a specific domain
router.get("/:domainId", async (req, res) => {
  try {
    const subcategories = await Subcategory.find({
      domain: req.params.domainId,
    });
    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch subcategories" });
  }
});

module.exports = router;

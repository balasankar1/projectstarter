const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  subcategories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }], // Self-referencing structure
});

module.exports = mongoose.model("Category", CategorySchema);

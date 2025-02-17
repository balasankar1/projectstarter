const mongoose = require("mongoose");

const SubcategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  domain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Domain",
    required: true,
  },
});

module.exports = mongoose.model("Subcategory", SubcategorySchema);

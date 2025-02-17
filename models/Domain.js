const mongoose = require("mongoose");

const DomainSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Domain", DomainSchema);

const express = require("express");
const Domain = require("../models/Domain");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const domains = await Domain.find();
    res.json(domains);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch domains" });
  }
});

module.exports = router;

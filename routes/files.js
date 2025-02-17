const express = require("express");
const { createClient } = require("@supabase/supabase-js");

const router = express.Router();
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Get all files in a subcategory
router.get("/:subcategory", async (req, res) => {
  const { subcategory } = req.params;

  const { data, error } = await supabase.storage
    .from("starter-files")
    .list(subcategory);

  if (error) return res.status(400).json({ error: "Failed to fetch files" });

  res.json(data);
});

// Get a download link for a file
router.get("/:subcategory/download/:filename", async (req, res) => {
  const { subcategory, filename } = req.params;

  const { data, error } = await supabase.storage
    .from("starter-files")
    .createSignedUrl(`${subcategory}/${filename}`, 60);

  if (error)
    return res.status(400).json({ error: "Failed to generate download URL" });

  res.json({ url: data.signedUrl });
});

module.exports = router;

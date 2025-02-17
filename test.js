import { createClient } from "@supabase/supabase-js";

// Supabase credentials
const supabaseUrl = "https://mulwphqfjewweyjhutfv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11bHdwaHFmamV3d2V5amh1dGZ2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczOTQzMTU4MCwiZXhwIjoyMDU1MDA3NTgwfQ.zuwktBWZnuiNIGJefbPBdQ6nqB0k7TwgUwJKzFvUIFw";

// Create a Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchSubfolders(bucketName, folderPath) {
  const { data, error } = await supabase.storage
    .from(bucketName)
    .list(folderPath, { limit: 100 });

  if (error) {
    console.error("Error fetching subfolders of ${folderPath}:", error);
    return null;
  }

  // Return all folders and files within the folderPath
  return data;
}

// Example Usage:
fetchSubfolders("ML", "UnsupervisedLearningAlgorithms").then((contents) => {
  console.log("Subfolders in 'a':", contents);
});

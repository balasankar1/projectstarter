import { createClient } from "@supabase/supabase-js";

// Supabase credentials
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

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

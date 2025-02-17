const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/domains", require("./routes/domains"));
app.use("/api/subcategories", require("./routes/subcategories"));
app.use("/api/files", require("./routes/files"));
app.use("/api/categories", require("./routes/categories"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

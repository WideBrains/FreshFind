const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sellerRoutes = require("./routes/seller");
const productRoutes = require("./routes/product");
const authRoutes = require("./routes/auth");
const pool = require("./db");
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/product", productRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "FreshFind API is running!" });
});

// Test database connection
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ success: true, time: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

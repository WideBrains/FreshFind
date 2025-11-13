const express = require("express");
const router = express.Router();
const pool = require("../db");

// Add a new product
router.post("/", async (req, res) => {
  try {
    const { seller_id, name, price, unit, stock_quantity, image_url } =
      req.body;

    const newProduct = await pool.query(
      "INSERT INTO products (seller_id, name, price, unit, stock_quantity, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [seller_id, name, price, unit, stock_quantity, image_url || null]
    );

    res.json({
      message: "Product added",
      product: newProduct.rows[0],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all products for a seller
router.get("/seller/:seller_id", async (req, res) => {
  try {
    const { seller_id } = req.params;

    const products = await pool.query(
      "SELECT * FROM products WHERE seller_id = $1 ORDER BY created_at DESC",
      [seller_id]
    );

    res.json({ products: products.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update product
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, unit, stock_quantity, image_url } = req.body;

    const result = await pool.query(
      "UPDATE products SET name = $1, price = $2, unit = $3, stock_quantity = $4, image_url = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *",
      [name, price, unit, stock_quantity, image_url, id]
    );

    res.json({
      message: "Product updated",
      product: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete product
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM products WHERE id = $1", [id]);

    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get nearby sellers with products (location-based search)
router.get("/nearby", async (req, res) => {
  try {
    const { latitude, longitude, radius } = req.query;

    // Using Haversine formula to calculate distance
    const query = `
      SELECT 
        s.id as seller_id,
        s.business_name,
        s.phone,
        s.current_latitude,
        s.current_longitude,
        (
          6371 * acos(
            cos(radians($1::float)) * cos(radians(s.current_latitude::float)) *
            cos(radians(s.current_longitude::float) - radians($2::float)) +
            sin(radians($1::float)) * sin(radians(s.current_latitude::float))
          )
        ) AS distance
      FROM sellers s
      WHERE s.is_active = true
        AND s.current_latitude IS NOT NULL
        AND s.current_longitude IS NOT NULL
        AND (
          6371 * acos(
            cos(radians($1::float)) * cos(radians(s.current_latitude::float)) *
            cos(radians(s.current_longitude::float) - radians($2::float)) +
            sin(radians($1::float)) * sin(radians(s.current_latitude::float))
          )
        ) < $3::float
      ORDER BY distance
    `;

    const sellers = await pool.query(query, [latitude, longitude, radius || 5]);

    res.json({ sellers: sellers.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

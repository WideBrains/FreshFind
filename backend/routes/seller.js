const express = require("express");
const router = express.Router();
const pool = require("../db");

// Create seller profile (after user registration)
router.post("/profile", async (req, res) => {
  try {
    const { user_id, business_name, phone } = req.body;

    const newSeller = await pool.query(
      "INSERT INTO sellers (user_id, business_name, phone) VALUES ($1, $2, $3) RETURNING *",
      [user_id, business_name, phone]
    );

    res.json({
      message: "Seller profile created",
      seller: newSeller.rows[0],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update seller location
router.put("/location", async (req, res) => {
  try {
    const { seller_id, latitude, longitude } = req.body;

    const result = await pool.query(
      "UPDATE sellers SET current_latitude = $1, current_longitude = $2 WHERE id = $3 RETURNING *",
      [latitude, longitude, seller_id]
    );

    res.json({
      message: "Location updated",
      seller: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Toggle seller active status
router.put("/toggle-active", async (req, res) => {
  try {
    const { seller_id, is_active } = req.body;

    const result = await pool.query(
      "UPDATE sellers SET is_active = $1 WHERE id = $2 RETURNING *",
      [is_active, seller_id]
    );

    res.json({
      message: "Status updated",
      seller: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get seller by user_id
router.get("/profile/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;

    const seller = await pool.query(
      "SELECT * FROM sellers WHERE user_id = $1",
      [user_id]
    );

    if (seller.rows.length === 0) {
      return res.status(404).json({ error: "Seller not found" });
    }

    res.json({ seller: seller.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

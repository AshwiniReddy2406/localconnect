// routes/products.js
const express = require('express');
const router = express.Router();
const { Product } = require('../models');

// GET /api/products
router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    console.error("❌ Product fetch error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

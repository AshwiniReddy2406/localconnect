const express = require('express');
const router = express.Router();
const { Cart } = require('../models');
const authMiddleware = require('../middleware/authMiddleware');

// POST /api/cart
router.post("/", authMiddleware, async (req, res) => {
  const { item } = req.body;
  const newItem = await Cart.create({ userId: req.userId, item });
  res.status(201).json(newItem);
});

// GET /api/cart
router.get('/', authMiddleware, async (req, res) => {
  const cartItems = await Cart.findAll({ where: { userId: req.userId } });
  const items = cartItems.map(ci => ci.item);
  res.json({ items });
});

// DELETE /api/cart/clear
router.delete('/clear', authMiddleware, async (req, res) => {
  await Cart.destroy({ where: { userId: req.userId } });
  res.json({ message: 'Cart cleared' });
});

module.exports = router;

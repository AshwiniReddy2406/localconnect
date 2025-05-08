const express = require('express');
const router = express.Router();
const db = require('../models');

// GET /api/orders/history
router.get('/history', async (req, res) => {
  try {
    // For now, return all orders (no user filter since no auth)
    const orders = await db.Order.findAll();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to load orders" });
  }
});

// GET /api/orders/:id
router.get('/:id', async (req, res) => {
  try {
    const order = await db.Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Failed to load order" });
  }
});

// POST /api/orders
router.post('/', async (req, res) => {
  try {
    // Simulate user ID = 1 for now
    const userId = 1;
    const cartItems = await db.Cart.findAll({ where: { userId } });
    const items = cartItems.map(item => item.item);

    const order = await db.Order.create({
      userId,
      items,
      status: 'Processing'
    });

    await db.Cart.destroy({ where: { userId } });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: "Failed to place order" });
  }
});

module.exports = router;

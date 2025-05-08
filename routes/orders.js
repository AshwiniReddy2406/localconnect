const express = require('express');
const router = express.Router();
const { Order } = require('../models');
const auth = require('../middleware/authMiddleware');

router.get("/:id", auth, async (req, res) => {
  try {
    const order = await Order.findOne({
      where: { id: req.params.id, userId: req.user.id }
    });

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to retrieve order" });
  }
});

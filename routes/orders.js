const express = require('express');
const router = express.Router();
const { Order } = require('../models');
const auth = require('../middleware/authMiddleware');

router.get('/history', auth, async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.userId },
      order: [['createdAt', 'DESC']]
    });
    res.json(orders);
  } catch (err) {
    console.error("❌ Fetch error:", err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

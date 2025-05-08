const express = require('express');
const auth = require('../middleware/authMiddleware');
const { User } = require('../models');  // Sequelize model

const router = express.Router();

// GET /me
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, {
      attributes: { exclude: ['password'] }
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user' });
  }
});

// POST /update
router.post('/update', auth, async (req, res) => {
  const { email, phone, address } = req.body;
  try {
    await User.update({ email, phone, address }, {
      where: { id: req.userId }
    });

    const updatedUser = await User.findByPk(req.userId);
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Error updating user' });
  }
});

module.exports = router;

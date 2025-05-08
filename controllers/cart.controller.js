// controllers/cart.controller.js

const db = require("../models");
const Cart = db.cart;

// Get all cart items for a user
exports.getCart = async (req, res) => {
  try {
    const cartItems = await Cart.findAll({ where: { userId: req.user.id } });
    res.json(cartItems);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

// Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const newCartItem = await Cart.create({ productId, quantity, userId: req.user.id });
    res.status(201).json(newCartItem);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    await Cart.destroy({ where: { id: itemId } });
    res.status(200).send("Item removed from cart");
  } catch (error) {
    res.status(500).send("Server error");
  }
};

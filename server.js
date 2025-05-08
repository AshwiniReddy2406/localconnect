console.log("🚀 Server script started");const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./models');
const bcrypt = require('bcryptjs'); // for default user

const app = express();
const PORT = process.env.PORT || 5050;
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Sync DB and seed default data
db.sequelize.sync({ force: false }).then(async () => {
  console.log("✅ DB Synced");

  // Create default user if not exists
  const existing = await db.User.findOne({ where: { email: 'user@example.com' } });
  if (!existing) {
    const hashedPassword = await bcrypt.hash('password123', 10);
    await db.User.create({
      email: 'user@example.com',
      password: hashedPassword
    });
    console.log("✅ Default user created");
  }

  // Seed sample products if none exist
  const productCount = await db.Product.count();
  if (productCount === 0) {
    await db.Product.bulkCreate([
      { name: "Milk", price: 2.5, image: "milk.jpg" },
      { name: "Bread", price: 1.8, image: "bread.jpg" },
      { name: "Eggs", price: 3.0, image: "eggs.jpg" }
    ]);
    console.log("✅ Products seeded");
  }
});

// ✅ API Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/users"));
app.use("/api/cart", require("./routes/cart"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/products", require("./routes/products"));

// ✅ Catch-all: Serve frontend for unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./models');
const bcrypt = require('bcryptjs'); // for default user

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// ✅ Sync DB and seed default data
db.sequelize.sync({ force: true }).then(async () => {
  console.log("✅ DB Synced");

  // Create default user
  const hashedPassword = await bcrypt.hash('password123', 10);
  await db.User.create({
    email: 'user@example.com',
    password: hashedPassword
  });

  // Seed products
  await db.Product.bulkCreate([
    { name: "Milk", price: 2.5, image: "milk.jpg" },
    { name: "Bread", price: 1.8, image: "bread.jpg" },
    { name: "Eggs", price: 3.0, image: "eggs.jpg" }
  ]);
});

// ✅ API Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/users"));
app.use("/api/cart", require("./routes/cart"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/products", require("./routes/products"));

// ✅ Optional fallback
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

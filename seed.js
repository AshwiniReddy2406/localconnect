// seed.js
const db = require('./models');

async function seedProducts() {
  try {
    await db.sequelize.sync({ force: false });

    const products = [
      { name: "Apples", price: 2.5, image: "apples.jpg" },
      { name: "Laptop", price: 999, image: "laptop.jpg" },
      { name: "Hammer", price: 15.0, image: "hammer.jpg" },
      { name: "Vitamin C", price: 12.0, image: "vitamin-c.jpg" },
      { name: "Microwave", price: 120.0, image: "microwave.jpg" }
    ];

    await db.Product.bulkCreate(products);
    console.log("✅ Products seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Failed to seed products:", err);
    process.exit(1);
  }
}

seedProducts();

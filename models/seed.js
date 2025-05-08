const db = require('./index');

(async () => {
  await db.sequelize.sync({ force: true });
  await db.Product.bulkCreate([
    { name: "Apples", price: 50 },
    { name: "Bananas", price: 30 },
    { name: "Bread", price: 40 },
    { name: "Milk", price: 25 }
  ]);
  console.log("✅ Sample products added");
})();

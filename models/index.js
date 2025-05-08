// models/index.js
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite"
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.User = require("./user")(sequelize, DataTypes);
db.Cart = require("./cart")(sequelize, DataTypes);
db.Order = require("./order")(sequelize, DataTypes);
db.Product = require("./product")(sequelize, DataTypes);

module.exports = db;

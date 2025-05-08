const fs = require("fs");
const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + '/../config/config.js')[env];

const sequelize = new Sequelize(config); // this uses better-sqlite3

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user")(sequelize, DataTypes);
db.Cart = require("./cart")(sequelize, DataTypes);
db.Order = require("./order")(sequelize, DataTypes);
db.Product = require("./product")(sequelize, DataTypes);

module.exports = db;

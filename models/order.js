// models/order.js
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    items: {
      type: DataTypes.JSON, // Can store array of cart items
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Processing"
    }
  });

  return Order;
};

module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    item: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Cart;
};

  
  
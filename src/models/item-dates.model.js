const {DataTypes} = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  const ItemDate = sequelize.define("item_date", {
    toDate: {
      type: DataTypes.DATEONLY,
    },
    itemId: {
      type: DataTypes.INTEGER
    },
    isDone: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  return ItemDate;
};

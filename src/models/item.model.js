const {DataTypes} = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  // sequelize.queryInterface.addColumn('items', 'title3', { type: Sequelize.TEXT });

  const Item = sequelize.define("items", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING
    },
    title2: {
      type: DataTypes.TEXT
    },
    label: {
      type: DataTypes.STRING
    },
    value: {
      type: DataTypes.TEXT
    },
    created_at: {
      type: DataTypes.DATEONLY,
    }
  });

  return Item;
};

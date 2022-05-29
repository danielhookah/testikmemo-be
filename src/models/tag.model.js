const {DataTypes} = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  // sequelize.queryInterface.addColumn('items', 'title3', { type: Sequelize.TEXT });

  const Tag = sequelize.define("tags", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER
    },
  });

  return Tag;
};

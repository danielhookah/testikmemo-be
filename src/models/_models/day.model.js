const {DataTypes} = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  const Day = sequelize.define("_days", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    completedCount: {
      type: DataTypes.STRING
    },
    date: {
      type: DataTypes.DATEONLY
    },
  });

  return Day;
};

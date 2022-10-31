const {DataTypes} = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  const Habit = sequelize.define("_habits", {
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
    description: {
      type: DataTypes.TEXT
    },
    point: {
      type: DataTypes.INTEGER
    },
    interval: {
      type: DataTypes.INTEGER
    },
    totalDaysCompleted: {
      type: DataTypes.INTEGER,
      default: 0,
    },
    countPerDay: {
      type: DataTypes.STRING
    },
    isStopped: {
      type: DataTypes.BOOLEAN
    },
  });

  return Habit;
};

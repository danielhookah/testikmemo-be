const {DataTypes} = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  const Goal = sequelize.define("_goals", {
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
    isCompleted: {
      type: DataTypes.BOOLEAN
    },
    subGoal: {
      type: DataTypes.INTEGER
    },
  });

  return Goal;
};

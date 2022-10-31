const {DataTypes} = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  const Progress = sequelize.define("_progresses", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER
    },
    habitsPoints: {
      type: DataTypes.INTEGER
    },
    goalsPoints: {
      type: DataTypes.INTEGER
    },
    pointsUsed: {
      type: DataTypes.INTEGER
    },
    created_at: {
      type: DataTypes.DATEONLY,
    }
  });

  return Progress;
};

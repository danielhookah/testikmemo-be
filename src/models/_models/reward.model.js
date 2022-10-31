const {DataTypes} = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  const Reward = sequelize.define("_rewards", {
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
    created_at: {
      type: DataTypes.DATEONLY,
    }
  });

  return Reward;
};

const {DataTypes} = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  const Phrase = sequelize.define("_phrases", {
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
    created_at: {
      type: DataTypes.DATEONLY,
    }
  });

  return Phrase;
};

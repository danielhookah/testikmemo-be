module.exports = (sequelize, Sequelize) => {
  const Item = sequelize.define("items", {
    title: {
      type: Sequelize.STRING
    },
    label: {
      type: Sequelize.STRING
    },
    value: {
      type: Sequelize.TEXT
    },
    created_at: {
      type: Sequelize.DATEONLY
    }
  });

  return Item;
};

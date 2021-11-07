module.exports = (sequelize, Sequelize) => {
  // sequelize.queryInterface.addColumn('items', 'title3', { type: Sequelize.TEXT });

  const Item = sequelize.define("items", {
    title: {
      type: Sequelize.STRING
    },
    title2: {
      type: Sequelize.TEXT
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

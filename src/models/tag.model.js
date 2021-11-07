module.exports = (sequelize, Sequelize) => {
  // sequelize.queryInterface.addColumn('items', 'title3', { type: Sequelize.TEXT });

  const Tag = sequelize.define("tags", {
    title: {
      type: Sequelize.STRING
    },
  });

  return Tag;
};

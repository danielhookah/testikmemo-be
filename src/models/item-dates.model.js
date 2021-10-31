module.exports = (sequelize, Sequelize) => {
  const ItemDate = sequelize.define("item_date", {
    toDate: {
      type: Sequelize.DATEONLY
    },
  });

  return ItemDate;
};

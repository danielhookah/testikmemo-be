const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.item = require("../models/item.model")(sequelize, Sequelize);
db.tag = require("../models/tag.model")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.itemDate = require("../models/item-dates.model")(sequelize, Sequelize);

// console.log(123)
// db.sequelize.sync({
//     alter: true,
// });
// console.log(312)

//
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});
//

db.tag.belongsToMany(db.item, {
  through: "item_tags",
  foreignKey: "tagId",
  otherKey: "itemId"
});
db.item.belongsToMany(db.tag, {
  through: "item_tags",
  foreignKey: "itemId",
  otherKey: "tagId"
});

db.item.hasMany(db.itemDate, {
  foreignKey: 'itemId',
  as: 'dates'
});
db.itemDate.belongsTo(db.item, {
  foreignKey: 'itemId',
});

db.user.hasMany(db.item, {
  foreignKey: 'userId',
  as: 'items'
});
db.item.belongsTo(db.user, {
  foreignKey: 'userId',
});
//

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;

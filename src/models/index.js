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
// Build YOUrself
db.habit = require("../models/_models/habit.model")(sequelize, Sequelize);
db.day = require("../models/_models/day.model")(sequelize, Sequelize);
db.goal = require("../models/_models/goal.model")(sequelize, Sequelize);
db.progress = require("../models/_models/progress.model")(sequelize, Sequelize);
db.reward = require("../models/_models/reward.model")(sequelize, Sequelize);
db.phrase = require("../models/_models/phrase.model")(sequelize, Sequelize);
// Build YOUrself

// console.log(123)
db.sequelize.sync({
    alter: true,
});
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
// Build YOUrself
db.habit.hasMany(db.day, {
  foreignKey: 'habitId',
  as: 'days'
});
db.day.belongsTo(db.habit, {
  foreignKey: 'habitId',
});

db.user.hasMany(db.habit, {
  foreignKey: 'userId',
  as: 'habits'
});
db.habit.belongsTo(db.user, {
  foreignKey: 'userId',
});

db.goal.hasMany(db.goal, {
  foreignKey: 'parentId',
  as: 'children'
});
db.goal.belongsTo(db.goal, {
  foreignKey: 'parentId',
});
// Build YOUrself

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;

const { authJwt } = require("../../middlewares");
const controller = require("../../controllers/_controllers/habit.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/habit",
    [authJwt.verifyToken],
    controller.getHabits
  );

  app.get(
    "/api/habit/:id",
    [authJwt.verifyToken],
    controller.getHabit
  );

  app.post(
    "/api/habit",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.postHabit
  );

  app.put(
    "/api/habit/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.putHabit
  );

  app.put(
    "/api/habit/:id/set-day",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.setHabitDay
  );
};

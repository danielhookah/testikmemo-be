const { authJwt } = require("../../middlewares");
const controller = require("../../controllers/_controllers/goal.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/goal",
    [authJwt.verifyToken],
    controller.getGoals
  );

  app.get(
    "/api/goal/:id",
    [authJwt.verifyToken],
    controller.getGoal
  );

  app.post(
    "/api/goal",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.postGoal
  );

  app.put(
    "/api/goal/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.putGoal
  );

  app.put(
    "/api/goal/:id/set-complete",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.toggleGoalCompleted
  );
};

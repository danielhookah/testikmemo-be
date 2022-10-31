const { authJwt } = require("../../middlewares");
const controller = require("../../controllers/_controllers/reward.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/reward",
    [authJwt.verifyToken],
    controller.getRewards
  );

  app.get(
    "/api/reward/:id",
    [authJwt.verifyToken],
    controller.getReward
  );

  app.post(
    "/api/reward",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.postReward
  );

  app.put(
    "/api/reward/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.putReward
  );
};

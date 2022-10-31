const { authJwt } = require("../../middlewares");
const controller = require("../../controllers/_controllers/progress.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/progress",
    [authJwt.verifyToken],
    controller.getProgresses
  );

  app.get(
    "/api/progress/:id",
    [authJwt.verifyToken],
    controller.getProgress
  );

  app.post(
    "/api/progress",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.postProgress
  );

  app.put(
    "/api/progress/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.putProgress
  );
};

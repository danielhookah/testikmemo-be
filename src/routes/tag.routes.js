const { authJwt } = require("../middlewares");
const controller = require("../controllers/tag.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/tag",
    [authJwt.verifyToken],
    controller.getTags
  );

  app.post(
    "/api/tag",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.postTag
  );

  app.put(
    "/api/tag/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.putTag
  );
};

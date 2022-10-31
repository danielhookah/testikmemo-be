const { authJwt } = require("../../middlewares");
const controller = require("../../controllers/_controllers/phrase.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/phrase",
    [authJwt.verifyToken],
    controller.getPhrases
  );

  app.get(
    "/api/phrase/:id",
    [authJwt.verifyToken],
    controller.getPhrase
  );

  app.post(
    "/api/phrase",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.postPhrase
  );

  app.put(
    "/api/phrase/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.putPhrase
  );
};

const { authJwt } = require("../middlewares");
const controller = require("../controllers/item.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/item/all",
    [authJwt.verifyToken],
    controller.getItems
  );

  app.get(
    "/api/item/:date",
    [authJwt.verifyToken],
    controller.getItem
  );

  app.post(
    "/api/item",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.postItem
  );

  app.put(
    "/api/item/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.putItem
  );

  // app.get(
  //   "/api/test/admin",
  //   [authJwt.verifyToken, authJwt.isAdmin],
  //   controller.adminBoard
  // );
};

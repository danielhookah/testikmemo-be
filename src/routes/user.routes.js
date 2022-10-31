const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/user/me",
    [authJwt.verifyToken],
    controller.getMe
  );

  app.get(
    "/api/user/friends",
    [authJwt.verifyToken],
    controller.getFriendsData
  );
};

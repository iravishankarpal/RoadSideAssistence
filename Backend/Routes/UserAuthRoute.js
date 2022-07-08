const {
  userLoginHandler,
  userRegisterHandler,
  userGoogleAuthHandler,
} = require("../RoutesController/UserRoutersAction");

const userAuthRoutes = require("express").Router();

userAuthRoutes.route("/Login").post(userLoginHandler);
userAuthRoutes.route("/Register").post(userRegisterHandler);
userAuthRoutes.route("/GoogleAuth").post(userGoogleAuthHandler);

module.exports = { userAuthRoutes };

const {
  userLoginHandler,
  userRegisterHandler,
} = require("../RoutesController/UserRoutersAction");

const userAuthRoutes = require("express").Router();

userAuthRoutes.route("/Login").post(userLoginHandler);
userAuthRoutes.route("/Register").post(userRegisterHandler);

module.exports = { userAuthRoutes };

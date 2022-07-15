const {
  userLoginHandler,
  userRegisterHandler,
  userGoogleAuthHandler,
  userMechanicLogin,
  AdminLogin,
  userGoogleAuthRegisterHandler,
} = require("../RoutesController/UserRoutersAction");

const userAuthRoutes = require("express").Router();

userAuthRoutes.route("/Login").post(userLoginHandler);
userAuthRoutes.route("/Register").post(userRegisterHandler);
userAuthRoutes.route("/GoogleAuth").post(userGoogleAuthHandler);
userAuthRoutes.route("/GoogleAuthRegister").post(userGoogleAuthRegisterHandler);
userAuthRoutes.route("/MechanicLogin").post(userMechanicLogin);
userAuthRoutes.route("/AdminLogin").post(AdminLogin);

module.exports = { userAuthRoutes };

const {
  userLoginHandler,
  userRegisterHandler,
  userGoogleAuthHandler,
  userMechanicLogin,
  AdminLogin,
  AdminMechRegister,
} = require("../RoutesController/UserRoutersAction");

const userAuthRoutes = require("express").Router();

userAuthRoutes.route("/Login").post(userLoginHandler);
userAuthRoutes.route("/Register").post(userRegisterHandler);
userAuthRoutes.route("/GoogleAuth").post(userGoogleAuthHandler);
userAuthRoutes.route("/MechanicLogin").post(userMechanicLogin);
userAuthRoutes.route("/AdminLogin").post(AdminLogin);
userAuthRoutes.route("/AdminMechRegister").post(AdminMechRegister);

module.exports = { userAuthRoutes };

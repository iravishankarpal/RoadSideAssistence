const {
  userLoginHandler,
  userRegisterHandler,
  userGoogleAuthHandler,
  userMechanicLogin,
  AdminLogin,
  userGoogleAuthRegisterHandler,
} = require("../RoutesController/UserRoutersAction");
const { throwValidationErrors } = require("../Middleware/errorMiddleWare");
const userAuthRoutes = require("express").Router();
const Validation = require("../Middleware/validation");
userAuthRoutes
  .route("/Login")
  .post(
    Validation.email,
    Validation.password,
    throwValidationErrors,
    userLoginHandler
  );

userAuthRoutes
  .route("/Register")
  .post(
    Validation.email,
    Validation.password,
    Validation.PhoneNo,
    throwValidationErrors,
    userRegisterHandler
  );
userAuthRoutes.route("/GoogleAuth").post(userGoogleAuthHandler);
userAuthRoutes.route("/GoogleAuthRegister").post(userGoogleAuthRegisterHandler);
userAuthRoutes.route("/MechanicLogin").post(userMechanicLogin);
userAuthRoutes.route("/AdminLogin").post(AdminLogin);

module.exports = { userAuthRoutes };

const {
  AdminMechRegister,
  allMechanic,
  allUser,
} = require("../RoutesController/admin");

const admin = require("express").Router();

admin.route("/allUser").get(allUser);
admin.route("/allMechanic").get(allMechanic);
admin.route("/AdminMechRegister").get(AdminMechRegister);

module.exports = { admin };

const {
  AdminMechRegister,
  allMechanic,
  allUser,
  allQuery,
} = require("../RoutesController/admin");

const admin = require("express").Router();

admin.route("/allUser").get(allUser);
admin.route("/allMechanic").get(allMechanic);
admin.route("/allQuery").get(allQuery);
admin.route("/AdminMechRegister").post(AdminMechRegister);

module.exports = { admin };

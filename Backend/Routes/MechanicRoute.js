const {
  allQueryWithUserDetail,
} = require("../RoutesController/MechanicOperation");

const mechanicRoute = require("express").Router();

mechanicRoute.route("/allQueryWithUserDetail").get(allQueryWithUserDetail);

module.exports = { mechanicRoute };

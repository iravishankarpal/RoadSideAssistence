const protect = require("../Middleware/protect");
const { submitQuery } = require("../RoutesController/UserQueryAction");

const userQuery = require("express").Router();

userQuery.route("/Query").post(protect, submitQuery);

module.exports = { userQuery };

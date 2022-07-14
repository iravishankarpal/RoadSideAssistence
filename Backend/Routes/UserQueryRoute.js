const { submitQuery } = require("../RoutesController/UserQueryAction");

const userQuery = require("express").Router();

userQuery.route("/Query").post(submitQuery);

module.exports = { userQuery };

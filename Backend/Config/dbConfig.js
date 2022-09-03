const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

const conn = asyncHandler(async () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then((res) => {
      console.log(
        "connection :".green.inverse,
        res.connection.name,
        "connected".green
      );
    })
    .catch((err) => {
      console.log(err.message, " an error occurred while connecting to db");
      console.log("error :".red.inverse, err.message, "connectionFail".red);
    });
});

module.exports = conn;

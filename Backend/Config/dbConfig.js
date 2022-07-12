const mongoose = require("mongoose");

const conn = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URL)
      .then((d) => {
        console.log(
          //   d.connection.host,
          //   d.connection.port,
          "successfuly connected to db",
          d.connection.name
        );
      })
      .catch((err) => {
        console.log(err.message, " an error occurred while connecting to db");
      });
  } catch (error) {
    console.log(`try catch error while connect to db  ${error}`);
  }
};

module.exports = conn;

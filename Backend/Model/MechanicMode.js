const mongoose = require("mongoose");
const MechanicModel = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    PhoneNo: {
      type: String,
      require: true,
    },
  },
  {
    timestamp: true,
  }
);

const Mechanic = mongoose.model("mechanic", MechanicModel);

module.exports = Mechanic;

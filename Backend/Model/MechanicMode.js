const mongoose = require("mongoose");
const MechanicModel = mongoose.Schema(
  {
    Mech: {
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
    pic: {
      type: String,
      default:
        "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png",
    },
  },
  {
    timestamp: true,
  }
);

const Mechanic = mongoose.model("mechanic", MechanicModel);

module.exports = Mechanic;

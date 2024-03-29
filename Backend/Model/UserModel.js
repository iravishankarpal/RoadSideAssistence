const mongoose = require("mongoose");
const UserModel = mongoose.Schema(
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
      type: Number,
      require: true,
      default: "not provided",
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

const User = mongoose.model("User", UserModel);

module.exports = User;

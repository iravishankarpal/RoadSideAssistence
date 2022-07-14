const mongoose = require("mongoose");

const userQueryModel = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    VehicalNo: {
      type: sting,
      require: true,
    },
    VehicalType: {
      type: String,
      require: true,
    },
    VehicalProblem: {
      type: String,
      require: true,
    },
    Location: {
      type: String,
    },
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
  {
    timestamp: true,
  }
);

const userQuery = mongoose.model("Query", userQueryModel);
module.exports = userQuery;

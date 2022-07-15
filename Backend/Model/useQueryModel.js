const mongoose = require("mongoose");

const userQueryModel = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    VehicalNo: {
      type: String,
      require: true,
    },
    VehicalType: {
      type: String,
      // require: true,
      default: "two",
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

const Query = mongoose.model("Query", userQueryModel);
module.exports = Query;

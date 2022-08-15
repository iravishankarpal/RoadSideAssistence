const mongoose = require("mongoose");

const MessageModel = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", MessageModel);
module.exports = Message;

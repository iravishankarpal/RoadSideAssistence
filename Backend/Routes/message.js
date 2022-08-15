const message = require("express").Router();
const messageModel = require("../Model/MessageModel");
message.post("/", async (req, res) => {
  await messageModel
    .create(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.satus(400).json(err);
    });
});
message.get("/:id", async (req, res) => {
  await messageModel
    .find({ sender: req.params.id })
    .then((data) => {
      //   console.log(data);
      res.send(data);
    })
    .catch((err) => {
      res.send([]);
    });
});
module.exports = message;

const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 5000;
var app = express();
// middlewre
const morgan = require("morgan");
app.use(morgan("dev"));
var bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// db connection
const conn = require("./Config/dbConfig");
conn();

// parse application/json
app.use(bodyParser.json());
app.listen(port, console.log(`server is running on ${port}`));
const chats = require("./Data");
app.get("/", (req, res) => {
  res.json(chats);
});
console.log(`reached at the end code of node server  `);

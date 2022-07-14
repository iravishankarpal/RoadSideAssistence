const express = require("express");
const dotenv = require("dotenv");
var colors = require("colors");
dotenv.config();

const port = process.env.PORT || 5000;
var app = express();

// /create body parser instance
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.json());

//enable url encode for POST requests
app.use(bodyParser.urlencoded({ extended: true }));

// db connection
const conn = require("./Config/dbConfig");
conn();

// parse application/json
app.use(bodyParser.json());
app.listen(port, console.log(`server is running on ${port}`));
const chats = require("./Data");
app.get("/data", (req, res) => {
  res.json(chats);
});
// console.log(`reached at the end code of node server  `);

// middlewre
const morgan = require("morgan");
app.use(morgan("dev"));
const cors = require("cors");
app.use(cors({ origin: "*" }));
const { userAuthRoutes } = require("./Routes/UserAuthRoute");
const { userQuery } = require("./Routes/UserQueryRoute");
const { admin } = require("./Routes/AdminRoutes");

app.use("/UserAuth", userAuthRoutes);
app.use("/User", userQuery);
app.use("/admin", admin);

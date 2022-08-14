const express = require("express");
const dotenv = require("dotenv");
var colors = require("colors");
// const cors = require("cors");
dotenv.config();
const path = require("path");

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
// app.listen(port, console.log(`server is running on ${port}`));
const chats = require("./Data");
app.get("/data", (req, res) => {
  res.json(chats);
});
// console.log(`reached at the end code of node server  `);
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
});

server.listen(port, () => {
  console.log(`SERVER IS RUNNING on port ${port}`);
});
// middlewre
const morgan = require("morgan");
app.use(morgan("dev"));
const cors = require("cors");
app.use(cors({ origin: "*" }));
const { userAuthRoutes } = require("./Routes/UserAuthRoute");
const { userQuery } = require("./Routes/UserQueryRoute");
const { admin } = require("./Routes/AdminRoutes");
const { mechanicRoute } = require("./Routes/MechanicRoute");
const { notFound } = require("./Middleware/errorMiddleWare");

app.use("/UserAuth", userAuthRoutes);
app.use("/User", userQuery);
app.use("/admin", admin);
app.use("/MechanicOperation", mechanicRoute);
const paymentRoutes = require("./Routes/payment");
app.use("/payment", paymentRoutes);
// app.use(cors());

// ---------------deployment

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}
// ____________________end of deployment

app.use(notFound);

const express = require("express");
const dotenv = require("dotenv");
var colors = require("colors");
const expressAsyncHandler = require("express-async-handler");
// const cors = require("cors");
dotenv.config();
const path = require("path");

const port = process.env.PORT || 5000;
var app = express();

// /create body parser instance
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// db connection
const conn = require("./Config/dbConfig");
conn();

// app.listen(port, console.log(`server is running on ${port}`));
const chats = require("./Data");
app.get("/data", (req, res) => {
  res.json(chats);
});
// console.log(`reached at the end code of node server  `);
// chat started
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
    socket.to(data.sender).emit("receive_message", data);
  });
});

server.listen(port, () => {
  console.log(`SERVER IS RUNNING on port ${port}`);
});

// chat ended
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
<<<<<<< HEAD
=======
const paymentRoutes = require("./Routes/payment");
app.use("/payment", paymentRoutes);
const message = require("./Routes/message");
app.use("/message", message);
>>>>>>> f19e7bf7036624c6b07733af615b8f07d56d48b1

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
// ==========start of global error handler================
app.use((error, req, res, next) => {
  console.log(` Error with ${error.status || 500}`.red.inverse, error);
  // save in log

  res.status(error.status || 500).json({
    status: error.status || 500,
    success: null,
    Error: {
      message: error.msg || "internal server error",
    },
  });
});

//  -------------------end of global error handler----------------

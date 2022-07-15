// const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../Model/UserModel");

const protect = async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      //   console.log("token :", token);

      //decodes token id
      const decoded = jwt.verify(token, process.env.jwt_secret);

      req.user = await User.findById(decoded.id).select("-password");

      console.log("decoded req.user :", req.user, decoded.id);
      next();
    }

    if (!token) {
      res.status(401).send("Not authorized , no T");
    }
  } catch (error) {
    res.status(401).send("not authorized , T fail");
  }
};

module.exports = protect;

const name = "hellow";

console.log(name);

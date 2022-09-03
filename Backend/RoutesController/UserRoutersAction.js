const generateToken = require("../Config/JWT");
const User = require("../Model/UserModel");
const AsyncHandler = require("express-async-handler");
const userLoginHandler = AsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const userExit = await User.findOne({ email });
  if (!userExit) {
    return next({
      status: 409,
      msg: "user not exist please register  ",
    });
  }
  if (!(userExit.password === password)) {
    return next({
      msg: "wrong password",
      status: 409,
    });
  }

  if (userExit.password === password) {
    res.status(200).send({
      name: userExit.name,
      email: userExit.email,
      pic: userExit.pic,
      PhoneNo: userExit.PhoneNo,
      _id: userExit._id,
      token: generateToken(userExit._id),
    });
  } else {
    return next({
      msg: "something went wrong",
      status: 409,
    });
  }
});
const userRegisterHandler = AsyncHandler(async (req, res, next) => {
  const { name, email, pic, password, PhoneNo } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    return next({
      status: 409,
      msg: "user already exist Please login",
    });
  } else {
    await User.create({ name, email, pic, password, PhoneNo }).then((user) => {
      res.status(200).send({
        name: user.name,
        email: user.email,
        pic: user.pic,
        PhoneNo: user.PhoneNo,
        token: generateToken(user._id),
        _id: user._id,
      });
    });
  }
});

const userGoogleAuthHandler = AsyncHandler(async (req, res, next) => {
  const { name, email, pic } = req.body;
  User.findOne({ email }).then((user) => {
    res.status(200).send({
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  });
});

const userGoogleAuthRegisterHandler = AsyncHandler(async (req, res, next) => {
  const { name, email, pic } = req.body;
  User.findOne({ email })
    .then((user) => {
      res.status(200).send({
        name: user.name,
        email: user.email,
        pic: user.pic,
        token: generateToken(user._id),
      });
    })
    .catch(async (err) => {
      await User.create({ name, email, pic }).then((user) => {
        console.log(user);
        res.status(200).send({
          name: user.name,
          email: user.email,
          pic: user.pic,
          PhoneNo: user.PhoneNo,
          token: generateToken(user._id),
        });
      });
    });
});

const Mechanic = require("../Model/MechanicMode");
const expressAsyncHandler = require("express-async-handler");
// mechanic login
const userMechanicLogin = AsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const userExit = await Mechanic.findOne({ email });
  if (!userExit) {
    return next({
      status: 400,
      msg: "user not exist please contact to company  ",
    });
  }
  if (!(userExit.password === password)) {
    return next({
      status: 409,
      msg: "wrong password",
    });
  }

  if (userExit.password === password) {
    res.status(200).send({
      name: userExit.name,
      email: userExit.email,
      PhoneNo: userExit.PhoneNo,
      // Token: generateToken(userExit._id),
    });
  }
});
const AdminLogin = AsyncHandler((req, res) => {
  const { email, password } = req.body;
  if (email === "admin" && password === "password") {
    res.status(200).send("ok");
  } else {
    return next({
      status: 409,
      msg: "wrong password",
    });
  }
});
module.exports = {
  userLoginHandler,
  userRegisterHandler,
  userGoogleAuthHandler,
  userGoogleAuthRegisterHandler,
  userMechanicLogin,
  AdminLogin,
};

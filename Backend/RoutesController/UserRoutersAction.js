const generateToken = require("../Config/JWT");
const User = require("../Model/UserModel");

const userLoginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password === "") {
      res.status(409).send("fields cannot be empty");
    } else {
      const userExit = await User.findOne({ email });
      if (userExit) {
        if (userExit.password === password) {
          res.status(200).send({
            name: userExit.name,
            email: userExit.email,
            pic: userExit.pic,
            token: generateToken(userExit._id),
            //   timestamp: user.createdAt,
          });
        } else {
          res.status(409).send("wrong password ");
        }
      } else {
        res.status(409).send("user not exist please register ");
      }
    }
  } catch (error) {
    res.status(500).send("userLoginHandler try catch ", error);
  }
};
const userRegisterHandler = async (req, res) => {
  try {
    const { name, email, pic, password, PhoneNo } = req.body;
    if (email && name && password === "") {
      res.status(409).send("fields cannot be empty");
    } else {
      const userExist = await User.findOne({ email });
      if (userExist) {
        res.status(409).send("user already exist Please login");
      } else {
        await User.create({ name, email, pic, password, PhoneNo })
          .then((user) => {
            console.log(user);
            res.status(200).send({
              name: user.name,
              email: user.email,
              pic: user.pic,
              PhoneNo: user.PhoneNo,
              token: generateToken(user._id),
            });
          })
          .catch((err) => {
            res.status(400).send(`internal server err ${err}`);
          });
      }
    }
  } catch (error) {
    console.log("error in userRegisterHandler try catch", error);
  }
};

const userGoogleAuthHandler = async (req, res) => {
  try {
    const { name, email, pic } = req.body;
    if (email && name && pic === "") {
      res.status(409).send("fields cannot be empty");
    } else {
      await User.findOne({ email })
        .then((user) => {
          res.status(200).send({
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
          });
        })
        .catch((err) => {
          res.status(404).send(` you email is not found`);
        });
    }
  } catch (error) {
    console.log("try catch in userGoogleAuthHandler block", error);
  }
};
const userGoogleAuthRegisterHandler = async (req, res) => {
  try {
    const { name, email, pic } = req.body;
    if (email && name && pic === "") {
      res.status(409).send("fields cannot be empty");
    } else {
      await User.findOne({ email })
        .then((user) => {
          res.status(200).send({
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
          });
        })
        .catch(async (err) => {
          await User.create({ name, email, pic, password, PhoneNo })
            .then((user) => {
              console.log(user);
              res.status(200).send({
                name: user.name,
                email: user.email,
                pic: user.pic,
                PhoneNo: user.PhoneNo,
                token: generateToken(user._id),
              });
            })
            .catch((err) => {
              res.status(400).send(`internal server err ${err}`);
            });
        });
    }
  } catch (error) {
    console.log("try catch in userGoogleAuthHandler block", error);
  }
};

const Mechanic = require("../Model/MechanicMode");
// mechanic login
const userMechanicLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log("Mech, password :", typeof Mech, password);
    if (email && password === "") {
      res.status(409).send("fields cannot be empty");
    } else {
      const userExit = await Mechanic.findOne({ email });

      if (userExit) {
        if (userExit.password === password) {
          res.status(200).send({
            Name: userExit.name,
            email: userExit.email,
            pic: userExit.pic,
            PhoneNo: PhoneNo,
            // Token: generateToken(userExit._id),
            //   timestamp: user.createdAt,
          });
        } else {
          res.status(409).send("wrong password");
        }
      } else {
        res.status(409).send("user not exist please contact to company  ");
      }
    }
  } catch (error) {
    console.log("trycatch in userMechLogin", error.message);
  }
};
const AdminLogin = (req, res) => {
  try {
    const { Mech, password } = req.body;
    // console.log("Mech, password  :", Mech, password);
    if (Mech && password === "") {
      res.status(409).send("fields cannot be empty");
    } else {
      if (Mech === "admin" && password === "password") {
        res.status(200).send("ok");
      } else {
        res.status(409).send("wrong user name or password");
      }
    }
  } catch (error) {
    console.log("trycatch error in Admin login", error);
  }
};
module.exports = {
  userLoginHandler,
  userRegisterHandler,
  userGoogleAuthHandler,
  userGoogleAuthRegisterHandler,
  userMechanicLogin,
  AdminLogin,
};

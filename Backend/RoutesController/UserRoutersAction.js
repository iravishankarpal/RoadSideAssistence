const generateToken = require("../Config/JWT");
const User = require("../Model/UserModel");

const userLoginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    if ((email && password === "") || null) {
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
    const { name, email, pic, password } = req.body;
    if ((email && name && password === "") || null) {
      res.status(409).send("fields cannot be empty");
    } else {
      const userExist = await User.findOne({ email });
      if (userExist) {
        res.status(409).send("user already exist Please login");
      } else {
        const user = await User.create({ name, email, pic, password });
        if (user) {
          res.status(200).send({
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
          });
        } else {
          res.json({
            status: 400,
            message: "error occured while summiting",
          });
        }
      }
    }
  } catch (error) {
    console.log("error in userRegisterHandler try catch", error);
  }
};

const userGoogleAuthHandler = async (req, res) => {
  try {
    const { name, email, pic } = req.body;
    if ((email && name && pic === "") || null) {
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
          User.create({ name, email, pic })
            .then((user) => {
              res.status(200).send({
                name: user.name,
                email: user.email,
                pic: user.pic,
                token: generateToken(user._id),
              });
            })
            .catch((error) => {
              res.status(404).send(`error google auth  ${error}`);
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
    if ((email && password === "") || null) {
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
    if ((Mech && password === "") || null) {
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
const AdminMechRegister = async (req, res) => {
  try {
    const { Mech, email, PhoneNo, password, pic } = req.body;
    if ((Mech && email && PhoneNo && password === "") || null) {
      res.status(409).send("fields cannot be empty");
    } else {
      const userExist = await Mechanic.findOne({ email });
      if (userExist) {
        res.status(409).send("user already exist Please login");
      } else {
        await Mechanic.create({ Mech, email, PhoneNo, password, pic })
          .then((x) => {
            res.status(200).send("user is created ");
          })
          .catch((err) => {
            res.status(409).send(`error occuer while submiting ${err}`);
          });
      }
    }

    // res.status();
  } catch (error) {
    console.log("trycatch error in AdmainMechRegister block", error);
  }

  // res.send("ok");
};
module.exports = {
  userLoginHandler,
  userRegisterHandler,
  userGoogleAuthHandler,
  userMechanicLogin,
  AdminLogin,
  AdminMechRegister,
};

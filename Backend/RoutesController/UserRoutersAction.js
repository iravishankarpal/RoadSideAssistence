const generateToken = require("../Config/JWT");
const User = require("../Model/UserModel");

const userLoginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
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
      res.status(409).send("user not exist register login ");
    }
  } catch (error) {
    res.status(500).send("trych server error");
  }
  //   res.send("login");
};
const userRegisterHandler = async (req, res) => {
  try {
    const { name, email, pic, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(409).send("user already exist Please login");
    } else {
      const user = await User.create({ name, email, pic, password });
      if (user) {
        res.status(200).send(
          //   user
          //   ,
          {
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
            //   timestamp: user.createdAt,
          }
        );
      } else {
        res.json({
          status: 400,
          message: "error occured while summiting",
        });
      }
    }
  } catch (error) {
    console.log(error, "error in register try catch");
  }
};

const userGoogleAuthHandler = async (req, res) => {
  const { name, email, pic } = req.body;
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
          res.status(404).send(`error google auth ${error}`);
        });
    });
};

module.exports = {
  userLoginHandler,
  userRegisterHandler,
  userGoogleAuthHandler,
};

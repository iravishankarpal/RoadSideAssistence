const Mechanic = require("../Model/MechanicMode");
const User = require("../Model/UserModel");

const AdminMechRegister = async (req, res) => {
  try {
    const { Mech, email, PhoneNo, password, pic } = req.body;
    if (Mech && email && PhoneNo && password === "" && null) {
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
};
const allUser = async (req, res) => {
  try {
    await User.find({})
      .then((x) => {
        res.status(200).send(x);
      })
      .catch((x) => {
        res.status(400).send("error while fetching data");
      });
  } catch (error) {
    console.log(`error`);
  }
};

const allMechanic = async (req, res) => {
  try {
    await Mechanic.find({})
      .then((x) => {
        res.status(200).send(x);
      })
      .catch((x) => {
        res.status(400).send("error while fetching data");
      });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { AdminMechRegister, allUser, allMechanic };

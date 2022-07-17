const Mechanic = require("../Model/MechanicMode");
const Query = require("../Model/useQueryModel");
const User = require("../Model/UserModel");

const AdminMechRegister = async (req, res) => {
  try {
    const { name, email, PhoneNo, password, pic } = req.body;
    console.log(req.body);
    if (name && email && PhoneNo && password === "" && null) {
      res.status(409).send("fields cannot be empty");
    } else {
      const userExist = await Mechanic.findOne({ email });
      if (userExist) {
        res.status(409).send("user already exist ");
      } else {
        await Mechanic.create({ name, email, PhoneNo, password, pic })
          .then((x) => {
            res.status(200).send(`user created`);
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

const allQuery = async (req, res) => {
  try {
    await Query.find({})
      .then((x) => {
        // console.log(x.red);
        res.status(200).send(x === undefined ? "empty" : x);
      })
      .catch((x) => {
        res.status(400).send("error while fetching data");
      });
  } catch (error) {
    console.log(error);
  }
};

const DeleteQuery = async (req, res) => {
  try {
    await Query.deleteOne({ _id: req.params.id })
      .then((x) => {
        res.status(200).send(`query deleted `);
      })
      .catch((x) => {
        res.status(404).send(`error query while ${req.params.id} `);
      });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  AdminMechRegister,
  allUser,
  allMechanic,
  allQuery,
  DeleteQuery,
};

const Query = require("../Model/useQueryModel");
const User = require("../Model/UserModel");

const allQueryWithUserDetail = async (req, res) => {
  try {
    // geting query fron query mode and user detail from them user model
    await Query.find({})
      .then((querys) => {
        res.send(querys);
        // filter it and find all the quer where query has sender id
      }).catch((err) => {
        res.status(400).send("error in fetching the DATA", err);
      });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { allQueryWithUserDetail };

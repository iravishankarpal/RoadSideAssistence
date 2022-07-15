const Query = require("../Model/useQueryModel");

const submitQuery = async (req, res) => {
  try {
    const { lat, lng, Location, VehicalNo, VehicalType, VehicalProblem, name } =
      req.body;
    await Query.create({
      lat,
      lng,
      Location,
      VehicalNo,
      VehicalType,
      VehicalProblem,
      sender: req.user._id,
    })
      .then((x) => {
        // console.log("new user query", x);
        res.status(200).send("query submit we wil contact you soon");
      })
      .catch((err) => {
        res.status(301).send(`error on summiting to db ${err}`);
      });
  } catch (error) {
    console.log(`error in try catch block of userSubmiting query ${error}`);
  }

  // res.send("query routea");
};

module.exports = {
  submitQuery,
};

// http://localhost:3000/User/Query
// http://localhost:3000/User/Query
// {"Location":"asdf","VehicalNo":"adsfa","VehicalType":"asdf","VehicalProblem":"asdf","lat":19.199032083693833,"lng":73.1779398725927}

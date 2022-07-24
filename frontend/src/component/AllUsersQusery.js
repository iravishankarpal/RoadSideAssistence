import axios from "axios";
import React from "react";

function AllUsersQusery() {
  useEffect(() => {
    async function fetchAllUsersQuery() {
      await axios
        .get("/User/allQuery")
        .then((x) => {
          console.log(x.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchAllUsersQuery();
  }, []);

  return <div></div>;
}

export default AllUsersQusery;

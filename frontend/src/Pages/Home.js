import axios from "axios";
import React, { useEffect, useState } from "react";

function Home() {
  const [name, setName] = useState([]);
  const fetchname = async () => {
    await axios
      .get("/data")
      .then((res) => {
        setName(res.data);
        console.log(res.data);
      })
      // .then((res) =>)
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    fetchname();
  }, []);

  return <div>{name.map((x) => x.chatName)}</div>;
}

export default Home;

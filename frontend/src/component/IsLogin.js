import React, { useEffect } from "react";
import { useSelector } from "react-redux";

function IsLogin() {
  const { token } = useSelector((state) => state.login);
  useEffect(() => {
    if (token !== null) {
      window.location.replace("/MainMap");
    }
  }, [token]);

  return <></>;
}

export default IsLogin;

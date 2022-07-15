import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function IsLogin() {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.login);
  useMemo(() => {
    if (token !== null) {
      navigate("/MainMap");
    } else {
      navigate("/");
    }
  }, [token, navigate]);

  return <></>;
}

export default IsLogin;

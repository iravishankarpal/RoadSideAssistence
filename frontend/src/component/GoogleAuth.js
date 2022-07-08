import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";

function GoogleAuth() {
  //   const { error, loding } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const handleGoogleAuth = async () => {
    dispatch({ type: "USER_LOGIN_REQUEST" });
  };
  return (
    <div>
      <Button variant="danger" className="container" onClick={handleGoogleAuth}>
        Login with Google
      </Button>
    </div>
  );
}

export default GoogleAuth;

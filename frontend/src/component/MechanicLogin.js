import axios from "axios";
import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Error from "./Error";
import Loding from "./Loding";

function MechanicLogin() {
  const email = useRef();
  const password = useRef();
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const { error, loding } = useSelector((state) => state.login);
  //  IsLogin();
  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      if ((password.current.value && email.current.value) !== "") {
        e.preventDefault();
        dispatch({ type: "USER_LOGIN_REQUEST" });
        if (email.current.value === "admin") {
          await axios
            .post("UserAuth/AdminLogin", {
              email: email.current.value,
              password: password.current.value,
            })
            .then(() => {
              dispatch({ type: "USER_LOGIN_SUCCESS" });
              navigation("/Admin");
            })
            .catch((err) => {
              console.log(err.response.data);
              dispatch({
                type: "USER_LOGIN_FAIL",
                payload: err.response.data,
              });
            });
        } else {
          await axios
            .post("UserAuth/MechanicLogin", {
              email: email.current.value,
              password: password.current.value,
            })
            .then((res) => {
              // console.log(res.data);
              dispatch({ type: "USER_LOGIN_SUCCESS", payload: res.data });
              navigation("/mechanicPage");
            })
            .catch((err) => {
              dispatch({
                type: "USER_LOGIN_FAIL",
                payload: err.response.data,
              });
            });
        }
      } else {
        dispatch({
          type: "USER_LOGIN_FAIL",
          payload: "user or password is empty",
        });
      }
    } catch (error) {
      dispatch({ type: "USER_LOGIN_FAIL", payload: error.response.data });
    }
  };
  return (
    <div>
      <Form onSubmit={(e) => handleLogin(e)}>
        {error && <Error>{error.message}</Error>}
        {loding && <Loding />}
        <Form.Group className="mb-3" controlId="formBasicMech">
          <Form.Label>user id or email</Form.Label>
          <Form.Control type="text" ref={email} placeholder="Enter user id" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" ref={password} placeholder="Password" />
        </Form.Group>

        <Button variant="primary" type="submit" className="container">
          Login
        </Button>
        <br className="m-3" />
        {/* <GoogleAuth className="mt-3" /> */}
      </Form>
    </div>
  );
}

export default MechanicLogin;

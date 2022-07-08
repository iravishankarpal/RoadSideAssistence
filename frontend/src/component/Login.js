import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import Error from "./Error";
import Loding from "./Loding";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import IsLogin from "./IsLogin";
import GoogleAuth from "./GoogleAuth";
function Login() {
  const email = useRef();
  const password = useRef();
  const dispatch = useDispatch();

  const { error, loding } = useSelector((state) => state.login);
  IsLogin();
  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      dispatch({ type: "USER_LOGIN_REQUEST" });

      await axios
        .post("UserAuth/Login", {
          email: email.current.value,
          password: password.current.value,
        })
        .then((res) => {
          dispatch({ type: "USER_LOGIN_SUCCESS", payload: res.data });
        })
        .catch((err) => {
          dispatch({ type: "USER_LOGIN_FAIL", payload: err.response.data });
        });
    } catch (error) {
      dispatch({ type: "USER_LOGIN_FAIL", payload: error.response.data });
      console.log(`error is occuered while fetching data ${error}`);
    }
  };

  return (
    <div>
      <Form onSubmit={(e) => handleLogin(e)}>
        {error && <Error>{error.message}</Error>}
        {loding && <Loding />}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" ref={email} placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" ref={password} placeholder="Password" />
          <Form.Text className="text-muted">
            Never share your password with anyone else.
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit" className="container">
          Login
        </Button>
        <GoogleAuth />
      </Form>
    </div>
  );
}

export default Login;

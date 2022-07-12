import axios from "axios";
import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Error from "./Error";
import Loding from "./Loding";

function MechanicLogin() {
  const Mech = useRef();
  const password = useRef();
  const dispatch = useDispatch();

  const { error, loding } = useSelector((state) => state.login);
  //  IsLogin();
  const handleLogin = async (e) => {
    try {
    } catch (error) {
      dispatch({ type: "USER_LOGIN_FAIL", payload: error.response.data });
    }
    try {
      e.preventDefault();
      if ((password.current.value && Mech.current.value) !== "") {
        e.preventDefault();
        dispatch({ type: "USER_LOGIN_REQUEST" });

        await axios
          .post("UserAuth/MechanicLogin", {
            Mech: Mech.current.value,
            password: password.current.value,
          })
          .then((res) => {
            console.log(res.data);
            dispatch({ type: "USER_LOGIN_SUCCESS", payload: res.data });
          })
          .catch((err) => {
            dispatch({
              type: "USER_LOGIN_FAIL",
              payload: err.response.data,
            });
          });
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
          <Form.Label>user id </Form.Label>
          <Form.Control type="text" ref={Mech} placeholder="Enter user id" />
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

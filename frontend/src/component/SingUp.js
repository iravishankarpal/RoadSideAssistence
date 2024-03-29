import axios from "axios";
import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Error from "./Error";
import Loding from "./Loding";
import IsLogin from "./IsLogin";
// import GoogleAuth from "./GoogleAuth";

function SingUp() {
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const rePassword = useRef();
  const PhoneNo = useRef();

  const { error, loding } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  IsLogin();
  const handleSingup = async (e) => {
    console.log(
      "password.current.vaule == rePassword.current.value :",
      password.current.value,
      rePassword.current.value
    );
    try {
      e.preventDefault();
      if (
        (password.current.value &&
          name.current.value &&
          email.current.value &&
          PhoneNo.current.value) !== ""
      ) {
        if (password.current.value === rePassword.current.value) {
          await axios
            .post("/UserAuth/Register", {
              name: name.current.value,
              email: email.current.value,
              password: password.current.value,
              PhoneNo: PhoneNo.current.value,
            })
            .then((res) => {
              dispatch({ type: "USER_LOGIN_SUCCESS", payload: res.data });
            })
            .catch((err) =>
              dispatch({ type: "USER_LOGIN_FAIL", payload: err.response.data })
            );
        } else {
          dispatch({
            type: "USER_LOGIN_FAIL",
            payload: "password did not match",
          });
        }
      } else {
        dispatch({
          type: "USER_LOGIN_FAIL",
          payload: "field is missing",
        });
      }
    } catch (error) {
      console.log(error);
      // dispatch({ type: "USER_LOGIN_FAIL", payload: error.response.data });
    }
  };
  return (
    <div>
      <Form onSubmit={(e) => handleSingup(e)}>
        {error && <Error>{error.message}</Error>}
        {loding && <Loding />}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name </Form.Label>
          <Form.Control type="Name" ref={name} placeholder="Enter name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" ref={email} placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" ref={password} placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Re-enter password</Form.Label>
          <Form.Control
            type="password"
            ref={rePassword}
            placeholder="Re-enter password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPhone">
          <Form.Label>Phone No </Form.Label>
          <Form.Control
            type="Name"
            ref={PhoneNo}
            maxLength="10"
            placeholder="Enter Phone no"
            onKeyUp={(e) => {
              var phone = e.target.value;

              if (!phone.match("[0-9]{10}")) {
                dispatch({
                  type: "USER_LOGIN_FAIL",
                  payload: "Please provide valid phone number",
                });
              }
            }}
          />
        </Form.Group>
        
        <Button className="container" variant="primary" type="submit">
          Submit
        </Button>{" "}
        <Button
          className="my-2 container"
          variant="warning"
          onClick={() => {
            name.current.value = "";
            email.current.value = "";
            password.current.value = "";
            rePassword.current.value = "";
          }}
        >
          Reset
        </Button>{" "}
        {/* <GoogleAuth url={"UserAuth/GoogleAuthRegister"}></GoogleAuth> */}
      </Form>
    </div>
  );
}

export default SingUp;

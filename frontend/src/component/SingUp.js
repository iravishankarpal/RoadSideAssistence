import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Error from "./Error";
import Loding from "./Loding";

function SingUp() {
  const navigate = useNavigate();
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const rePassword = useRef();
  const Pic = useRef();

  const { error, loding, token } = useSelector((state) => state.login);
  // console.log("error, loding  :", error, loding);
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      navigate("/Chat");
    }
  }, [token]);
  const handleSingup = async (e) => {
    try {
      e.preventDefault();
      if (
        password.current.value === rePassword.current.value &&
        ((password.current.value ||
          name.current.value ||
          email.current.value) != "" ||
          null)
      ) {
        await axios
          .post("/UserAuth/Register", {
            name: name.current.value,
            email: email.current.value,
            password: password.current.value,
            pic: Pic.current.value,
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
          payload: "passowrd not match or field is missing",
        });
      }
    } catch (error) {
      dispatch({
        type: "USER_LOGIN_FAIL",
        payload: error,
      });
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
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Profile pic</Form.Label>
          <Form.Control type="file" ref={Pic} placeholder="profile.png" />
        </Form.Group>
        <Button className="" variant="primary" type="submit">
          Submit
        </Button>{" "}
        <Button
          className="m-2"
          variant="warning"
          onClick={() => {
            name.current.value = "";
            email.current.value = "";
            password.current.value = "";
            rePassword.current.value = "";
            Pic.current.value = "";
          }}
        >
          Reset
        </Button>{" "}
        {/* <Button className="m-2" variant="danger" type="submit">
          SingUp with Google
        </Button> */}
      </Form>
    </div>
  );
}

export default SingUp;

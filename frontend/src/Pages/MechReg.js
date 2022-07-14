import axios from "axios";
import React, { useEffect, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Error from "../component/Error";
import Loding from "../component/Loding";

function MechReg() {
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const rePassword = useRef();
  const PhoneNo = useRef();
  const Pic = useRef();

  const { error, loding } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "USER_LOGIN_SUCCESS" });
  }, [dispatch]);

  const handleSingup = async (e) => {
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
            .post("/admin/AdminMechRegister", {
              name: name.current.value,
              email: email.current.value,
              password: password.current.value,
              pic: Pic.current.value,
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
      dispatch({ type: "USER_LOGIN_FAIL", payload: error.response.data });
      console.log(error);
    }
  };
  return (
    <div>
      <Form onSubmit={(e) => handleSingup(e)}>
        {error && <Error>{error.message}</Error>}
        {loding && <Loding />}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>mechanic Name </Form.Label>
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
            maxlength="10"
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
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Profile pic (optional)</Form.Label>
          <Form.Control type="file" ref={Pic} placeholder="profile.png" />
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
            Pic.current.value = "";
          }}
        >
          Reset
        </Button>{" "}
      </Form>
    </div>
  );
}

export default MechReg;

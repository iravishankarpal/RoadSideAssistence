// import axios from "axios";
import axios from "axios";
import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";
// import { BiCurrentLocation } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
// import { handleUserQuery } from "../app/Actions./userQueryAction";
import Error from "./Error";
import Loding from "./Loding";

function Problem() {
  const Location = useRef();
  const VehicalNo = useRef();
  const VehicalType = useRef();
  const VehicalProblem = useRef();

  const { error, loding, token } = useSelector((state) => state.login);
  const { lat, lng } = useSelector((state) => state.myLocation);
  const dispatch = useDispatch();

  const handleQueryInBlock = async (e) => {
    try {
      // console.log(Location.current.value);
      e.preventDefault();
      if (
        (VehicalNo.current.value &&
          VehicalProblem.current.value &&
          VehicalType.current.value) !== ""
      ) {
        const config = {
          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`,
          },
        };

        await axios
          .post(
            "/User/Query",
            {
              Location: Location.current.value,
              VehicalNo: VehicalNo.current.value,
              VehicalType: VehicalType.current.value,
              VehicalProblem: VehicalProblem.current.value,
              lat,
              lng,
            },
            config
          )
          .then((res) => {
            dispatch({ type: "REQUEST_SUCCESS", payload: res.data });
          })
          .catch((err) => {
            // console.log(err.response.message, err.response.data, err.message);
            dispatch({
              type: "USER_LOGIN_FAIL",
              payload: err.response.data || "axios eror",
            });
          });
      } else {
        dispatch({
          type: "USER_LOGIN_FAIL",
          payload: "field is missing",
        });
      }
    } catch (error) {
      dispatch({
        type: "USER_LOGIN_FAIL",
        payload: "error try catch in userQuery page",
      });
      console.log("error try catch in userQuery page", error);
    }
  };
  return (
    <div>
      <Form
        onSubmit={(e) => {
          handleQueryInBlock(e);
        }}
      >
        {error && <Error>{error.message}</Error>}
        {loding && <Loding />}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            ref={Location}
            placeholder={"land mark , city "}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Vehical Type </Form.Label>
          <Form.Control
            type="text"
            ref={VehicalType}
            placeholder=" truck ,car,auto "
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Vehical No</Form.Label>
          <Form.Control type="text" ref={VehicalNo} placeholder="MH05AG1234" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Vehical Problem</Form.Label>
          <Form.Control
            as="textarea"
            ref={VehicalProblem}
            placeholder="Car stop suddenly"
          />
        </Form.Group>
        <Button className="container" variant="primary" type="submit">
          Submit
        </Button>{" "}
      </Form>
    </div>
  );
}

export default Problem;

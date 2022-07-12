import axios from "axios";
import React, { useMemo, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { BiCurrentLocation } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import Error from "./Error";
import Loding from "./Loding";

function Problem() {
  const Location = useRef();
  const PhoneNo = useRef();
  const VehicalNo = useRef();
  const VehicalType = useRef();
  const VehicalProblem = useRef();

  const { error, loding } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  //   IsLogin();
  const handleUserQuery = async (e) => {
    try {
      // console.log(Location.current.value);
      e.preventDefault();
      if (
        (PhoneNo.current.value &&
          VehicalNo.current.value &&
          VehicalProblem.current.value &&
          VehicalType.current.value &&
          Location.current.value) !== ""
      ) {
        await axios
          .post("/UserAuth/", {
            PhoneNo: PhoneNo.current.value,
            Location: Location.current.value,
            VehicalNo: VehicalNo.current.value,
            VehicalType: VehicalType.current.value,
            VehicalProblem: VehicalProblem.current.value,
          })
          .then((res) => {
            dispatch({ type: "USER_LOGIN_SUCCESS", payload: res.data });
          })
          .catch((err) =>
            dispatch({
              type: "USER_LOGIN_FAIL",
              payload: err.response.data,
            })
          );
      } else {
        dispatch({
          type: "USER_LOGIN_FAIL",
          payload: "field is missing",
        });
      }
    } catch (error) {
      dispatch({ type: "USER_LOGIN_FAIL", payload: error.response.data });
      console.log("error try catch in userProblem page", error);
    }
  };
  const Currentlocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      Location.current.lat = position.coords.latitude;
      Location.current.lng = position.coords.longitude;
    });
    // Location.current.value = `${Location.current.lat}, ${Location.current.lng}`;
    // console.log("userQuery", );
  };
  useMemo(Currentlocation, [Location]);

  return (
    <div>
      <Form onSubmit={(e) => handleUserQuery(e)}>
        {error && <Error>{error.message}</Error>}
        {loding && <Loding />}
        <Form.Group className="mb-3" controlId="formBasicPhone">
          <Form.Label>Phone No </Form.Label>
          <Form.Control
            type="Name"
            ref={PhoneNo}
            placeholder="Enter Phone no"
            onKeyUp={(e) => {
              var phone = e.target.value;

              if (!phone.match("[0-9]{10}")) {
                // alert("Please provide valid phone number");
                dispatch({
                  type: "USER_LOGIN_FAIL",
                  payload: "Please provide valid phone number",
                });
              }
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            ref={Location}
            placeholder={
              Location.current.lat === undefined
                ? "land mark , city "
                : `${Location.current.lat}, ${Location.current.lng}`
            }
          />
          <Form.Label> auto Detect </Form.Label>
          <BiCurrentLocation
            style={{ fontSize: "2rem" }}
            onClick={() => Currentlocation()}
          ></BiCurrentLocation>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Vehical Type or number of wheel</Form.Label>
          <Form.Control type="number" ref={VehicalType} placeholder=" 3 " />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Vehical No</Form.Label>
          <Form.Control type="text" ref={VehicalNo} placeholder="MH05AG1234" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Vehical Problem</Form.Label>
          <Form.Control
            // type="text"
            as="textarea"
            ref={VehicalProblem}
            placeholder="Car stop suddenly"
          />
        </Form.Group>
        <Button className="container" variant="primary" type="submit">
          Submit
        </Button>{" "}
        {/* <GoogleAuth></GoogleAuth> */}
      </Form>
    </div>
  );
}

export default Problem;

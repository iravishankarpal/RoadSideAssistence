import axios from "axios";

export const handleUserQuery =
  async (
    e,
    PhoneNo,
    Location,
    VehicalNo,
    VehicalType,
    VehicalProblem,
    lat,
    lng
  ) =>
  async (dispatch) => {
    try {
      console.log(Location.current.value);
      e.preventDefault();
      if (
        (PhoneNo.current.value &&
          VehicalNo.current.value &&
          VehicalProblem.current.value &&
          VehicalType.current.value) !== ""
      ) {
        await axios
          .post("/UserAuth/", {
            PhoneNo: PhoneNo.current.value,
            Location: Location.current.value || { lat, lng },
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

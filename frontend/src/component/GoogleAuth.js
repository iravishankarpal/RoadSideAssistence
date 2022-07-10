import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "react-google-login";
import styled from "styled-components";
import axios from "axios";
import { gapi } from "gapi-script";
const GoogleAuthContainer = styled.div`
  min-width: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
`;
function GoogleAuth() {
  const dispatch = useDispatch();
  // const handleGoogleAuth = async () => {
  //   try {
  //     dispatch({ type: "USER_LOGIN_REQUEST" });
  //   } catch (error) {
  //     dispatch({ type: "USER_LOGIN_FAIL", payload: "error" });
  //   }
  // };
  const clientId =
    "91269092486-rel0vhark3mdfiln5si06506lge1t397.apps.googleusercontent.com";

  useEffect(() => {
    // var scopes = "";
    const start = async () => {
      await gapi.client.init({ clientId: clientId, scope: "" });
      // await gapi.loadAuth2(gapi, clientId, scopes);
    };
    gapi.load("client:auth2", start);
  }, []);

  return (
    <GoogleAuthContainer
      className="container my-2 g-signin g_id_signin"
      data-type="standard"
    >
      <GoogleLogin
        // onClick={handleGoogleAuth}
        clientId={clientId}
        buttonText="Sign In"
        onSuccess={async (res) => {
          console.log(res.profileObj);

          dispatch({ type: "USER_LOGIN_REQUEST" });
          await axios
            .post("UserAuth/GoogleAuth", {
              email: res.profileObj.email,
              name: res.profileObj.givenName,
              pic: res.profileObj.imageUrl,
            })
            .then((res) => {
              dispatch({ type: "USER_LOGIN_SUCCESS", payload: res.data });
            })
            .catch((err) => {
              dispatch({ type: "USER_LOGIN_FAIL", payload: err.response.data });
            });
        }}
        onFailure={(res) => {
          // console.log(res.error);
          console.log(res);
          dispatch({
            type: "USER_LOGIN_FAIL",
            payload: `google login fail ${res.error}`,
          });
        }}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </GoogleAuthContainer>
  );
}

export default GoogleAuth;

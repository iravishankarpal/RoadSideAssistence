export const login = (
  state = {
    error: false,
    loding: false,
    token: localStorage.getItem("RSA")
      ? JSON.parse(localStorage.getItem("RSA")).token
      : null,
  },
  action
) => {
  switch (action.type) {
    case "QUERY_DELETE":
      return { ...state, message: action.payload };
    case "REQUEST_SUCCESS":
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload || "ok",
      };
    case "USER_LOGIN_REQUEST":
      return { ...state, loding: true };
    case "USER_LOGIN_FAIL":
      return { ...state, error: true, message: action.payload, loding: false };

    case "USER_LOGIN_SUCCESS":
      if (action.payload === undefined) {
        return {
          ...state,
          loading: false,
          error: false,
        };
      } else {
        const user = JSON.stringify(action.payload);
        localStorage.setItem("RSA", user);

        return {
          ...state,
          loding: false,
          error: false,
          token: action.payload.token,
        };
      }

    case "USER_LOGOUT":
      localStorage.removeItem("RSA");
      return state;
    case "RESET_ERROR":
      return { ...state, error: false };
    default:
      return state;
  }
};

export const myLocation = (
  state = { lat: null, lng: null, locationName: "" },
  action
) => {
  switch (action.type) {
    case "SET_USER_COOD":
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

export default myLocation;

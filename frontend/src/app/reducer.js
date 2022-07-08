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
    case "USER_LOGIN_REQUEST":
      return { ...state, loding: true };
    case "USER_LOGIN_FAIL":
      return { ...state, error: true, message: action.payload, loding: false };
    case "USER_LOGIN_SUCCESS":
      const user = JSON.stringify(action.payload);
      localStorage.setItem("RSA", user);

      return {
        ...state,
        loding: false,
        error: false,
        token: action.payload.token,
      };
    case "USER_LOGOUT":
      localStorage.removeItem("RSA");
      return state;
    case "RESET_ERROR":
      return { ...state, error: false };
    default:
      return state;
  }
};

export const test2 = (state = {}, action) => {
  switch (action.type) {
    case "value":
      break;

    default:
      return state;
  }
};

export default test2;

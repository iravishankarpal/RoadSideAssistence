import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { login, myLocation } from "./reducer";
import thunk from "redux-thunk";
const store = configureStore(
  {
    reducer: {
      login,
      myLocation,
    },
  },
  applyMiddleware(thunk)
);

export default store;

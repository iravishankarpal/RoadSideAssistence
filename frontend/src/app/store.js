import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { login, test2 } from "./reducer";
import thunk from "redux-thunk";
const store = configureStore(
  {
    reducer: {
      login,
      test2,
    },
  },
  applyMiddleware(thunk)
);

export default store;

import { configureStore } from "@reduxjs/toolkit";
import { login, test2 } from "./reducer";
const store = configureStore({
  reducer: {
    login,
    test2,
  },
});

export default store;

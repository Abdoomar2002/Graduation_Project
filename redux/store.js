import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./rootReducer";

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.REACT_APP_DEV === "true", // Enable Redux DevTools in development mode
});

export default store;

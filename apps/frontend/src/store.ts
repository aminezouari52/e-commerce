import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import searchReducer from "./reducers/searchReducer";
import cartReducer from "./reducers/cartReducer";

export const store = configureStore({
  reducer: {
    userReducer,
    searchReducer,
    cartReducer,
  },
});

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./src/reducers/userReducer";
import searchReducer from "./src/reducers/searchReducer";
import cartReducer from "./src/reducers/cartReducer";

export const store = configureStore({
  reducer: {
    userReducer,
    searchReducer,
    cartReducer,
  },
});

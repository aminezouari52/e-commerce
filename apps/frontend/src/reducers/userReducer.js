import { createSlice } from "@reduxjs/toolkit";
import { removeLocalStorage, setLocalStorage } from "@/utils";

const initialState = {
  loggedInUser: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoggedInUser: (state, action) => {
      state.loggedInUser = action.payload;
      setLocalStorage("user", action.payload);
    },
    logout: (state) => {
      state.loggedInUser = null;
      removeLocalStorage("user");
    },
  },
});

export const { setLoggedInUser, logout } = userSlice.actions;

export default userSlice.reducer;

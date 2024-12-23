import { createSlice } from "@reduxjs/toolkit";
import { removeLocalStorage, setLocalStorage } from "@/utils/localStorage";

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      setLocalStorage("user", action.payload);
    },
    logout: (state) => {
      state.user = null;
      removeLocalStorage("user");
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;

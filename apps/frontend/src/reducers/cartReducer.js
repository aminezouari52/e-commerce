import { createSlice } from "@reduxjs/toolkit";
import {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
} from "@/utils/localStorage";

const initialState = {
  guestCart: getLocalStorage("guestCart") || [],
  userCart: getLocalStorage("userCart") || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setUserCart: (state, action) => {
      console.log(action.payload);
      state.userCart = action.payload;
      setLocalStorage("userCart", action.payload);
    },

    addUserProduct: (state, action) => {
      const { product, count } = action.payload;
      const cartProduct = state.userCart.find((p) => p._id === product._id);
      if (cartProduct) cartProduct.count += count;
      else state.userCart.push({ ...product, count: 1 });
      setLocalStorage("userCart", state.userCart);
    },

    updateUserProductCount: (state, action) => {
      const { productId, count } = action.payload;
      const product = state.userCart.find((c) => c._id === productId);
      if (product) product.count = count;
      setLocalStorage("userCart", state.userCart);
    },

    deleteUserProduct: (state, action) => {
      const { productId } = action.payload;
      const newCart = state.userCart.filter(
        (product) => product._id !== productId,
      );
      state.userCart = newCart;
      setLocalStorage("userCart", newCart);
    },

    emptyUserCart: (state) => {
      state.userCart = [];
      removeLocalStorage("userCart");
    },

    setGuestCart: (state, action) => {
      state.userCart = action.payload;
      setLocalStorage("guestCart", action.payload);
    },

    updateGuestProductCount: (state, action) => {
      const { productId, count } = action.payload;
      const product = state.guestCart.find((c) => c._id === productId);
      if (product) product.count = count;
      setLocalStorage("guestCart", state.guestCart);
    },

    addGuestProduct: (state, action) => {
      const { product, count } = action.payload;
      const cartProduct = state.guestCart.find((p) => p._id === product._id);
      if (cartProduct) cartProduct.count += count;
      else state.guestCart.push({ ...product, count: 1 });
      setLocalStorage("guestCart", state.guestCart);
    },

    deleteGuestProduct: (state, action) => {
      const { productId } = action.payload;
      const newCart = state.guestCart.filter(
        (product) => product._id !== productId,
      );
      state.guestCart = newCart;
      setLocalStorage("guestCart", newCart);
    },

    emptyGuestCart: (state) => {
      state.guestCart = [];
      removeLocalStorage("guestCart");
    },
  },
});

export const {
  setGuestCart,
  addGuestProduct,
  emptyGuestCart,
  updateGuestProductCount,
  deleteGuestProduct,
  addUserProduct,
  emptyUserCart,
  updateUserProductCount,
  deleteUserProduct,
  setUserCart,
} = cartSlice.actions;
export default cartSlice.reducer;

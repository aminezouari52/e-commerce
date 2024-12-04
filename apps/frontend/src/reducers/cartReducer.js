import { createSlice } from "@reduxjs/toolkit";
import { setLocalStorage, getLocalStorage, removeLocalStorage } from "@/utils";

const initialState = {
  cart: getLocalStorage("cart") || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
      setLocalStorage("cart", action.payload);
    },

    addProduct: (state, action) => {
      const { _id } = action.payload;
      const product = state.cart.find((c) => c._id === _id);
      if (product) product.count += 1;
      else state.cart.push({ ...action.payload, count: 1 });
      setLocalStorage("cart", state.cart);
    },

    removeProduct: (state, action) => {
      const { _id } = action.payload;
      const newCart = state.cart.filter((cart) => cart._id !== _id);
      state.cart = newCart;
      setLocalStorage("cart", newCart);
    },

    updateProductCount: (state, action) => {
      const { _id, count } = action.payload;
      const product = state.cart.find((c) => c._id === _id);
      if (product) product.count = count;
      setLocalStorage("cart", state.cart);
    },

    incrementProductCount: (state, action) => {
      const { _id } = action.payload;
      const product = state.cart.find((c) => c._id === _id);
      if (product) product.count++;
      setLocalStorage("cart", state.cart);
    },

    decrementProductCount: (state, action) => {
      const { _id } = action.payload;
      const product = state.cart.find((c) => c._id === _id);
      if (product) product.count--;
      setLocalStorage("cart", state.cart);
    },

    emptyCart: (state, action) => {
      state.cart = [];
      removeLocalStorage("cart");
    },
  },
});

export const {
  setCart,
  addProduct,
  emptyCart,
  updateProductCount,
  incrementProductCount,
  decrementProductCount,
  removeProduct,
} = cartSlice.actions;
export default cartSlice.reducer;

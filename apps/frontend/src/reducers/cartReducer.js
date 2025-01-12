import { createSlice } from "@reduxjs/toolkit";
import {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
} from "@/utils/localStorage";

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
      const { product, count } = action.payload;
      const cartProduct = state.cart.find((p) => p._id === product._id);
      if (cartProduct) cartProduct.count += count;
      else state.cart.push({ ...product, count: 1 });
      setLocalStorage("cart", state.cart);
    },

    updateProductCount: (state, action) => {
      const { productId, count } = action.payload;
      const product = state.cart.find((c) => c._id === productId);
      if (product) product.count = count;
      setLocalStorage("cart", state.cart);
    },

    deleteProduct: (state, action) => {
      const { productId } = action.payload;
      const newCart = state.cart.filter((product) => product._id !== productId);
      state.cart = newCart;
      setLocalStorage("cart", newCart);
    },

    emptyCart: (state) => {
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
  deleteProduct,
} = cartSlice.actions;
export default cartSlice.reducer;

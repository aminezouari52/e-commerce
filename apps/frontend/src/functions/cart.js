import axios from "axios";

export const addUserProduct = async (body, authtoken) =>
  await axios.post(`${import.meta.env.VITE_API_V1_URL}/cart/product`, body, {
    headers: {
      authtoken,
    },
  });

export const updateUserProductCount = async (body, authtoken) =>
  await axios.put(`${import.meta.env.VITE_API_V1_URL}/cart/product`, body, {
    headers: {
      authtoken,
    },
  });

export const deleteUserProduct = async (productId, authtoken) =>
  await axios.delete(`${import.meta.env.VITE_API_V1_URL}/cart/${productId}`, {
    headers: {
      authtoken,
    },
  });

export const setUserCart = async (cart, authtoken) =>
  await axios.post(
    `${import.meta.env.VITE_API_V1_URL}/cart`,
    { cart },
    {
      headers: {
        authtoken,
      },
    },
  );

export const getUserCart = async (authtoken) =>
  await axios.get(`${import.meta.env.VITE_API_V1_URL}/cart`, {
    headers: {
      authtoken,
    },
  });

export const emptyUserCart = async (authtoken) =>
  await axios.delete(`${import.meta.env.VITE_API_V1_URL}/cart`, {
    headers: {
      authtoken,
    },
  });

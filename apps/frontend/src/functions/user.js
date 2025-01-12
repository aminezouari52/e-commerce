import axios from "axios";

export const updateUser = async (user, body) =>
  await axios.patch(
    `${import.meta.env.VITE_API_V1_URL}/user/${user.id}`,
    body,
    {
      headers: {
        authtoken: user.token,
      },
    },
  );

export const saveUserAddress = async (authtoken, address) =>
  await axios.post(
    `${import.meta.env.VITE_API_V1_URL}/user/address`,
    { address },
    {
      headers: {
        authtoken,
      },
    },
  );

export const saveUserPhoneNumber = async (authtoken, phone) =>
  await axios.post(
    `${import.meta.env.VITE_API_V1_URL}/user/phone`,
    { phone },
    {
      headers: {
        authtoken,
      },
    },
  );

export const getUserOrders = async (authtoken) =>
  await axios.get(`${import.meta.env.VITE_API_V1_URL}/user/orders`, {
    headers: {
      authtoken,
    },
  });

export const getUserWishlist = async (authtoken) =>
  await axios.get(`${import.meta.env.VITE_API_V1_URL}/user/wishlist`, {
    headers: {
      authtoken,
    },
  });

export const removeWishlist = async (productId, authtoken) =>
  await axios.put(
    `${import.meta.env.VITE_API_V1_URL}/user/wishlist/${productId}`,
    {},
    {
      headers: {
        authtoken,
      },
    },
  );

export const addToWishlist = async (productId, authtoken) =>
  await axios.post(
    `${import.meta.env.VITE_API_V1_URL}/user/wishlist`,
    { productId },
    {
      headers: {
        authtoken,
      },
    },
  );

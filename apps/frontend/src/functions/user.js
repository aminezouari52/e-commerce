import axios from "axios";

export const updateUser = async (user, body) => {
  return await axios.patch(
    `${import.meta.env.VITE_REACT_APP_API}/user/${user.id}`,
    body,
    {
      headers: {
        authtoken: user.token,
      },
    }
  );
};

export const setUserCart = async (cart, authtoken) => {
  const res = await axios.post(
    `${import.meta.env.VITE_REACT_APP_API}/user/cart`,
    { cart },
    {
      headers: {
        authtoken,
      },
    }
  );
  return res;
};

export const getUserCart = async (authtoken) =>
  await axios.get(`${import.meta.env.VITE_REACT_APP_API}/user/cart`, {
    headers: {
      authtoken,
    },
  });

export const emptyUserCart = async (authtoken) =>
  await axios.delete(`${import.meta.env.VITE_REACT_APP_API}/user/cart`, {
    headers: {
      authtoken,
    },
  });

export const saveUserAddress = async (authtoken, address) =>
  await axios.post(
    `${import.meta.env.VITE_REACT_APP_API}/user/address`,
    { address },
    {
      headers: {
        authtoken,
      },
    }
  );

export const saveUserPhoneNumber = async (authtoken, phone) =>
  await axios.post(
    `${import.meta.env.VITE_REACT_APP_API}/user/phone`,
    { phone },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getUserOrders = async (authtoken) =>
  await axios.get(`${import.meta.env.VITE_REACT_APP_API}/user/orders`, {
    headers: {
      authtoken,
    },
  });

export const getWishlist = async (authtoken) =>
  await axios.get(`${import.meta.env.VITE_REACT_APP_API}/user/wishlist`, {
    headers: {
      authtoken,
    },
  });

export const removeWishlist = async (productId, authtoken) =>
  await axios.put(
    `${import.meta.env.VITE_REACT_APP_API}/user/wishlist/${productId}`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );

export const addToWishlist = async (productId, authtoken) => {
  return await axios.post(
    `${import.meta.env.VITE_REACT_APP_API}/user/wishlist`,
    { productId },
    {
      headers: {
        authtoken,
      },
    }
  );
};

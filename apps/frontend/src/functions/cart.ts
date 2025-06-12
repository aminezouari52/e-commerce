import axios from "axios";

export const syncUserCart = async (cart, authtoken) =>
  await axios.post(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/cart`,
    { cart },
    {
      headers: {
        authtoken,
      },
    },
  );

export const getUserCart = async (authtoken) =>
  await axios.get(`${process.env.NEXT_PUBLIC_API_V1_URL}/cart`, {
    headers: {
      authtoken,
    },
  });

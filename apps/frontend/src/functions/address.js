import axios from "axios";

export const createAddress = async (body) =>
  await axios.post(`${import.meta.env.VITE_API_V1_URL}/address`, body);

export const getUserAddress = async (userId) =>
  await axios.get(`${import.meta.env.VITE_API_V1_URL}/address/${userId}`);

export const updateAddress = async (authtoken, id, body) =>
  await axios.patch(`${import.meta.env.VITE_API_V1_URL}/address/${id}`, body, {
    headers: { authtoken },
  });

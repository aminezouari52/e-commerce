import axios from "axios";

export const createAddress = async (body) =>
  await axios.post(`${import.meta.env.VITE_API_V1_URL}/address`, body);

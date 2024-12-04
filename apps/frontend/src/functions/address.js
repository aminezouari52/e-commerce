import axios from "axios";

export const createAddress = async (body) =>
  await axios.post(`${import.meta.env.VITE_REACT_APP_API}/address`, body);

import axios from "axios";

export const getSubs = async () =>
  await axios.get(`${import.meta.env.VITE_API_V1_URL}/sub`);

export const getSub = async (slug) =>
  await axios.get(`${import.meta.env.VITE_API_V1_URL}/sub/${slug}`);

export const removeSub = async (slug, authtoken) =>
  await axios.delete(`${import.meta.env.VITE_API_V1_URL}/sub/${slug}`, {
    headers: {
      authtoken,
    },
  });

export const updateSub = async (slug, sub, authtoken) =>
  await axios.put(`${import.meta.env.VITE_API_V1_URL}/sub/${slug}`, sub, {
    headers: {
      authtoken,
    },
  });

export const createSub = async (sub, authtoken) =>
  await axios.post(`${import.meta.env.VITE_API_V1_URL}/sub`, sub, {
    headers: {
      authtoken,
    },
  });

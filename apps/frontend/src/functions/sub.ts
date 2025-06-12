import axios from "axios";

export const getSubs = async () =>
  await axios.get(`${process.env.NEXT_PUBLIC_API_V1_URL}/sub`);

export const getSub = async (slug) =>
  await axios.get(`${process.env.NEXT_PUBLIC_API_V1_URL}/sub/${slug}`);

export const removeSub = async (slug, authtoken) =>
  await axios.delete(`${process.env.NEXT_PUBLIC_API_V1_URL}/sub/${slug}`, {
    headers: {
      authtoken,
    },
  });

export const updateSub = async (slug, sub, authtoken) =>
  await axios.put(`${process.env.NEXT_PUBLIC_API_V1_URL}/sub/${slug}`, sub, {
    headers: {
      authtoken,
    },
  });

export const createSub = async (sub, authtoken) =>
  await axios.post(`${process.env.NEXT_PUBLIC_API_V1_URL}/sub`, sub, {
    headers: {
      authtoken,
    },
  });

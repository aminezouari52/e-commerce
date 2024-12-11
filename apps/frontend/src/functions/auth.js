import axios from "axios";

export const createOrUpdateUser = async (authtoken) => {
  return await axios.post(
    `${import.meta.env.VITE_API_V1_URL}/auth/create-or-update-user`,
    {},
    {
      headers: {
        authtoken,
      },
    },
  );
};

export const getCurrentUser = async (authtoken) => {
  return await axios.post(
    `${import.meta.env.VITE_API_V1_URL}/auth/current-user`,
    {},
    {
      headers: {
        authtoken,
      },
    },
  );
};

export const currentAdmin = async (authtoken) => {
  return await axios.post(
    `${import.meta.env.VITE_API_V1_URL}/auth/current-admin`,
    {},
    {
      headers: {
        authtoken,
      },
    },
  );
};

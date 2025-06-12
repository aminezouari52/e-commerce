import axios from "axios";

export const createOrUpdateUser = async (authtoken: string) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/auth/create-or-update-user`,
    {},
    {
      headers: {
        authtoken,
      },
    },
  );
};

export const getCurrentUser = async (authtoken: string) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/auth/current-user`,
    {},
    {
      headers: {
        authtoken,
      },
    },
  );
};

export const currentAdmin = async (authtoken: string) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/auth/current-admin`,
    {},
    {
      headers: {
        authtoken,
      },
    },
  );
};

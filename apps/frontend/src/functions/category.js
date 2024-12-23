import axios from "axios";

export const getCategories = async () =>
  await axios.get(`${import.meta.env.VITE_API_V1_URL}/category/categories`);

export const getParentCategories = async () =>
  await axios.get(
    `${import.meta.env.VITE_API_V1_URL}/category/Parentcategories`,
  );

export const getCategory = async (slug) =>
  await axios.get(`${import.meta.env.VITE_API_V1_URL}/category/${slug}`);

export const removeCategory = async (slug, authtoken) =>
  await axios.delete(`${import.meta.env.VITE_API_V1_URL}/category/${slug}`, {
    headers: {
      authtoken,
    },
  });

export const updateCategory = async (slug, category, authtoken) =>
  await axios.put(
    `${import.meta.env.VITE_API_V1_URL}/category/${slug}`,
    category,
    {
      headers: {
        authtoken,
      },
    },
  );

export const createCategory = async (category, authtoken) =>
  await axios.post(`${import.meta.env.VITE_API_V1_URL}/category`, category, {
    headers: {
      authtoken,
    },
  });

export const getCategorySubs = async (_id) =>
  await axios.get(`${import.meta.env.VITE_API_V1_URL}/category/subs/${_id}`);

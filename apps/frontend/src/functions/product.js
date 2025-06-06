import axios from "axios";

export const createProduct = async (product, authtoken) => {
  const formData = new FormData();
  Object.keys(product).map((key) => {
    return formData.append(key, product[key]);
  });

  await axios.post(`${import.meta.env.VITE_API_V1_URL}/product`, formData, {
    headers: {
      authtoken,
    },
  });
};

export const getProductsByCount = async (count) =>
  await axios.get(
    `${import.meta.env.VITE_API_V1_URL}/product/products/${count}`,
  );

export const removeProduct = async (slug, authtoken) => {
  await axios.delete(`${import.meta.env.VITE_API_V1_URL}/product/${slug}`, {
    headers: {
      authtoken,
    },
  });
};

export const getProduct = async (slug) =>
  await axios.get(`${import.meta.env.VITE_API_V1_URL}/product/${slug}`);

export const updateProduct = async (slug, product, authtoken) =>
  await axios.put(
    `${import.meta.env.VITE_API_V1_URL}/product/${slug}`,
    product,
    {
      headers: {
        authtoken,
      },
    },
  );

export const getProducts = async (sort, order, limit) =>
  await axios.post(`${import.meta.env.VITE_API_V1_URL}/product/products`, {
    sort,
    order,
    limit,
  });

export const productStar = async (productId, star, authtoken) =>
  await axios.put(
    `${import.meta.env.VITE_API_V1_URL}/product/star/${productId}`,
    { star },
    {
      headers: {
        authtoken,
      },
    },
  );

export const getRelated = async (productId) =>
  await axios.get(
    `${import.meta.env.VITE_API_V1_URL}/product/related/${productId}`,
  );

export const fetchProductsByFilter = async (body) =>
  await axios.post(
    `${import.meta.env.VITE_API_V1_URL}/product/search/filters`,
    body,
  );

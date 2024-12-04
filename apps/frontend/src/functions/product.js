import axios from "axios";

export const createProduct = async (product, authtoken) => {
  const formData = new FormData();
  Object.keys(product).map((key) => {
    formData.append(key, product[key]);
  });

  await axios.post(`${import.meta.env.VITE_REACT_APP_API}/product`, formData, {
    headers: {
      authtoken,
    },
  });
};

export const getProductsByCount = async (count) =>
  await axios.get(`${import.meta.env.VITE_REACT_APP_API}/products/${count}`);

export const removeProduct = async (slug, authtoken) => {
  await axios.delete(`${import.meta.env.VITE_REACT_APP_API}/product/${slug}`, {
    headers: {
      authtoken,
    },
  });
};

export const getProduct = async (slug) =>
  await axios.get(`${import.meta.env.VITE_REACT_APP_API}/product/${slug}`);

export const updateProduct = async (slug, product, authtoken) =>
  await axios.put(
    `${import.meta.env.VITE_REACT_APP_API}/product/${slug}`,
    product,
    {
      headers: {
        authtoken,
      },
    }
  );

export const getProducts = async (sort, order, limit) =>
  await axios.post(`${import.meta.env.VITE_REACT_APP_API}/products`, {
    sort,
    order,
    limit,
  });

export const productStar = async (productId, star, authtoken) =>
  await axios.put(
    `${import.meta.env.VITE_REACT_APP_API}/product/star/${productId}`,
    { star },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getRelated = async (productId) =>
  await axios.get(
    `${import.meta.env.VITE_REACT_APP_API}/product/related/${productId}`
  );

export const fetchProductsByFilter = async (body) =>
  await axios.post(
    `${import.meta.env.VITE_REACT_APP_API}/search/filters`,
    body
  );

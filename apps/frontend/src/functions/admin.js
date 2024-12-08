import axios from "axios";

export const getOrders = async (authtoken) =>
  await axios.get(`${import.meta.env.VITE_API_V1_URL}/admin/orders`, {
    headers: {
      authtoken,
    },
  });

export const changeStatus = async (orderId, orderStatus, authtoken) =>
  await axios.put(
    `${import.meta.env.VITE_API_V1_URL}/admin/order-status`,
    { orderId, orderStatus },
    {
      headers: {
        authtoken,
      },
    },
  );

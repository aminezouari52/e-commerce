import axios from "axios";

export const getOrders = async (authtoken) =>
  await axios.get(`${import.meta.env.VITE_REACT_APP_API}/admin/orders`, {
    headers: {
      authtoken,
    },
  });

export const changeStatus = async (orderId, orderStatus, authtoken) =>
  await axios.put(
    `${import.meta.env.VITE_REACT_APP_API}/admin/order-status`,
    { orderId, orderStatus },
    {
      headers: {
        authtoken,
      },
    }
  );

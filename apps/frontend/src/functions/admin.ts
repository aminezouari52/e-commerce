import axios from "axios";

export const getOrders = async (authtoken: string) =>
  await axios.get(`${process.env.NEXT_PUBLIC_API_V1_URL}/admin/orders`, {
    headers: {
      authtoken,
    },
  });

export const changeStatus = async (
  orderId: string,
  orderStatus: string,
  authtoken: string,
) =>
  await axios.put(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/admin/order-status`,
    { orderId, orderStatus },
    {
      headers: {
        authtoken,
      },
    },
  );

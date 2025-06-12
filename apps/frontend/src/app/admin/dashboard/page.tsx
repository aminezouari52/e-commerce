"use client";

import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useToast } from "../../../utils/toast";
import { getOrders, changeStatus } from "../../../functions/admin";
import Orders from "../../../components/Orders";
import { Box, Heading, Text } from "@chakra-ui/react";

const AdminDashboard = () => {
  const toast = useToast();

  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.userReducer.user);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () =>
    getOrders(user.token).then((res) => {
      setOrders(res.data);
    });

  const handleStatusChange = (orderId, orderStatus) => {
    changeStatus(orderId, orderStatus, user.token).then(() => {
      toast("Status updated", "success");
      loadOrders();
    });
  };
  return (
    <Box overflowY="hidden">
      <Heading size="lg" color="primary.500" my={5}>
        Admin dashboard
      </Heading>
      {orders?.length ? (
        <Orders orders={orders} handleStatusChange={handleStatusChange} />
      ) : (
        <Text>No orders yet</Text>
      )}
    </Box>
  );
};
export default AdminDashboard;

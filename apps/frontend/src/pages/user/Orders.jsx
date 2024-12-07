import { useState, useEffect } from "react";
import { getUserOrders } from "@/functions/user";
import { useSelector } from "react-redux";
import {
  Heading,
  Box,
  Tr,
  Td,
  IconButton,
  Tooltip,
  Badge,
} from "@chakra-ui/react";
import DataTable from "@/components/DataTable";
import { DateTime } from "luxon";
import { ViewIcon } from "@chakra-ui/icons";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.userReducer.loggedInUser);
  useEffect(() => {
    getData();
  }, []);
  function getData() {
    getUserOrders(user.token).then((res) => {
      setOrders(res.data);
    });
  }

  const getBadgeColor = (status) => {
    if (status === "pending") return "orange";
    if (status === "accepted") return "green";
    if (status === "refused") return "red";
    return "";
  };

  const headers = [
    "reference",
    "amount",
    "status",
    "products",
    "created at",
    "actions",
  ];

  const renderRow = (order, index) => (
    <Tr key={index} fontSize="xs">
      <Td fontWeight="bold">#{order?.ref}</Td>
      <Td>{order?.amount.toFixed(2)}dt</Td>
      <Td>
        <Badge variant="solid" colorScheme={getBadgeColor(order?.status)}>
          {order?.status}
        </Badge>
      </Td>
      <Td>{order?.products?.length} products</Td>
      <Td>
        {DateTime.fromJSDate(new Date(order?.createdAt)).toFormat(
          "dd-MM-yyyy 'at' HH:mm",
        )}
      </Td>
      <Td>
        <Tooltip label="view" aria-label="view product">
          <IconButton
            size="sm"
            variant="ghost"
            color="blue.600"
            icon={<ViewIcon />}
          ></IconButton>
        </Tooltip>
      </Td>
    </Tr>
  );

  return (
    <Box my={2}>
      <Heading size="lg" color="primary.500" my={5}>
        My orders
      </Heading>

      <DataTable headers={headers} renderRow={renderRow} data={orders} />
    </Box>
  );
};

export default Orders;

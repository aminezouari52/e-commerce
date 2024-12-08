import React, { useEffect, useState } from "react";
import DataTableDisplay from "../../components/dataDisplay/DataTable";
import { useSelector } from "react-redux";
import { Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";
import { getUserOrders } from "../../functions/user";

function UserAccount() {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.userReducer.loggedInUser);

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    getUserOrders(user.token).then(() => {
      setOrders([]);
    });
  }

  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "price",
      selector: (row) => row.amount,
      sortable: true,
    },
    {
      name: "action",
      selector: (row) => row.year,
      sortable: true,
    },
  ];
  return (
    <div>
      <Card my={2}>
        <CardHeader>
          <Heading size="lg" color="primary.500" my={5}>
            My orders
          </Heading>
        </CardHeader>

        <CardBody>
          <DataTableDisplay data={orders} columns={columns} />
        </CardBody>
      </Card>
    </div>
  );
}

export default UserAccount;

"use client";

import { useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Card,
  CardBody,
} from "@chakra-ui/react";

function DataTableDisplay({ columns, data }) {
  useEffect(() => {
    console.log(data);
  }, []);

  return (
    <div>
      <Card my={2}>
        <CardBody>
          <TableContainer bg="white" py={10}>
            <Table variant="striped">
              {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
              <Thead>
                <Tr>
                  {columns?.map((column) => {
                    return <Th>{column?.name}</Th>;
                  })}
                </Tr>
              </Thead>
              <Tbody>
                {data?.length !== 0 &&
                  data?.map((item) => (
                    <Tr>
                      {columns?.map((column) => (
                        <Th>{column?.selector(item)}</Th>
                      ))}
                    </Tr>
                  ))}
              </Tbody>
              {/* <Tfoot>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Tfoot> */}
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
    </div>
  );
}

export default DataTableDisplay;

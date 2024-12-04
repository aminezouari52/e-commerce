import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Flex,
  Card,
  CardBody,
} from "@chakra-ui/react";
function DataTableDisplay({ columns, data }) {
 
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
                {data?.map((item) => (
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

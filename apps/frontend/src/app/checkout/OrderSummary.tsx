"use client";

import {
  Box,
  Heading,
  Flex,
  Text,
  Divider,
  Button,
  Stack,
  Badge,
  Image,
} from "@chakra-ui/react";

const OrderSummary = ({ products, onOpen, total }) => {
  return (
    <Stack bg="#fff" p={4} w="700px" spacing={5} overflow="auto">
      <Flex alignItems="center" gap={2}>
        <Heading size="lg">Order Summary </Heading>
        <Badge px={1} fontSize="md" variant="solid" colorScheme="deepRed">
          {products?.length}
        </Badge>
      </Flex>
      <Divider size="lg" />

      {!products || (products?.length === 0 && <Text>Your cart is empty</Text>)}

      {products?.map((product, i) => (
        <Flex key={i} alignItems="center" gap={4}>
          <Box>
            <Image
              src={product?.images?.length ? product?.images[0].url : null}
              h="auto"
              w="100px"
              maxWidth="180px"
            />
          </Box>
          <Flex
            fontSize="xs"
            w="100%"
            direction="column"
            justifyContent="space-between"
            gap={4}
          >
            <Flex justifyContent="space-between" fontWeight="bold">
              <Text>
                x{product?.count} {product?.title}
              </Text>
              <Text>${(product?.price * product?.count).toFixed(2)}</Text>
            </Flex>
            <Flex direction="column">
              <Flex>
                <Text color="gray">color: </Text>
                <Text>{product?.color}</Text>
              </Flex>
              <Flex>
                <Text color="gray">brand: </Text>
                <Text>{product?.brand}</Text>
              </Flex>
              <Flex>
                <Text color="gray">category: </Text>
                <Text>{product?.category?.name}</Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      ))}

      <Divider size="lg" />
      <Heading size="md">
        Total: <b>{total.toFixed(2)}$</b>
      </Heading>

      <Divider size="lg" />

      <Flex>
        <Button
          w="100%"
          variant="solid"
          colorScheme="primary"
          isDisabled={!products.length}
          _hover={{
            opacity: products.length !== 0 && 0.8,
          }}
          onClick={() => onOpen()}
        >
          Place Order
        </Button>
      </Flex>
    </Stack>
  );
};
export default OrderSummary;

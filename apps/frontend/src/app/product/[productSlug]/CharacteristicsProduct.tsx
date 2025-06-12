"use client";

import { Flex, Text, Stack, HStack, Button } from "@chakra-ui/react";
import Link from "next/link";

const ProductListItems = ({ product }) => {
  const { category, subs, shipping, color, brand, quantity, sold } = product;

  return (
    <Stack w="100%" spacing={4}>
      <Flex justifyContent="space-between">
        <Text fontWeight="medium" color="gray">
          Category
        </Text>
        {category && (
          <Button
            as={Link}
            href={`/category/${category.slug}`}
            variant="link"
            colorScheme="teal"
          >
            {category.name}
          </Button>
        )}
      </Flex>

      <Flex justifyContent="space-between">
        <Text fontWeight="medium" color="gray">
          Sub Categories
        </Text>
        {subs && (
          <HStack spacing={4}>
            {subs.map((s) => (
              <Button
                as={Link}
                href="/sub/${s.slug}"
                variant="link"
                colorScheme="teal"
                key={s._id}
              >
                {s.name}
              </Button>
            ))}
          </HStack>
        )}
      </Flex>

      <Flex justifyContent="space-between">
        <Text fontWeight="medium" color="gray">
          Shipping
        </Text>
        <Text fontWeight="medium">{shipping}</Text>
      </Flex>

      <Flex justifyContent="space-between">
        <Text fontWeight="medium" color="gray">
          Color
        </Text>
        <Text fontWeight="medium">{color}</Text>
      </Flex>

      <Flex justifyContent="space-between">
        <Text fontWeight="medium" color="gray">
          Brand
        </Text>
        <Text fontWeight="medium">{brand}</Text>
      </Flex>

      <Flex justifyContent="space-between">
        <Text fontWeight="medium" color="gray">
          Available
        </Text>
        <Text fontWeight="medium">{quantity}</Text>
      </Flex>

      <Flex justifyContent="space-between">
        <Text fontWeight="medium" color="gray">
          Sold
        </Text>
        <Text fontWeight="medium">{sold}</Text>
      </Flex>
    </Stack>
  );
};

export default ProductListItems;

// REACT
import { useEffect, useState } from "react";

// FUNCTIONS
import { getProducts } from "@/functions/product";

// COMPONENTS
import Carousel from "./Carousel";

// STYLE
import { Heading, Flex, Box, Text } from "@chakra-ui/react";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadAllProducts = () => {
      setLoading(true);
      getProducts("createdAt", "desc", products?.length).then((res) => {
        setProducts(res.data);
        setLoading(false);
      });
    };

    loadAllProducts();
  }, [products?.length]);

  return (
    <Box>
      <Heading
        display="flex"
        fontSize={{
          sm: "xl",
          md: "2xl",
          lg: "3xl",
        }}
        as="h1"
        pt={{ sm: 8, md: 10, lg: 12 }}
        justifyContent="center"
        bg="white"
      >
        Don't miss our &nbsp;
        <Text color="deepRed.500"> New </Text>
        &nbsp; Arrivals
      </Heading>
      <Flex bg="white" flexDirection="column" alignItems="center" gap="20px">
        <Carousel products={products} loading={loading} />
      </Flex>
    </Box>
  );
};

export default NewArrivals;

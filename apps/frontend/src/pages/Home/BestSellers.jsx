// REACT
import { useEffect, useState } from "react";

// FUNCTIONS
import { getProducts } from "@/functions/product";

// COMPONENTS
import Carousel from "./Carousel";

// STYLE
import { Heading, Flex, Box, Text } from "@chakra-ui/react";

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    // sort, order, limit
    getProducts("sold", "desc", products?.length).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

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
      >
        See our &nbsp;
        <Text color="deepRed.500"> best </Text>
        &nbsp; sellers
      </Heading>
      <Flex flexDirection="column" alignItems="center">
        <Carousel products={products} loading={loading} />
      </Flex>
    </Box>
  );
};

export default BestSellers;

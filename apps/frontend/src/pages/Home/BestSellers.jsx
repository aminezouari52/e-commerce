// HOOKS
import { useEffect, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { useToast } from "@/utils/toast";

// FUNCTIONS
import { getProducts } from "@/functions/product";

// COMPONENTS
import Carousel from "@/components/Carousel";
import ProductCard from "@/components/cards/ProductCard";

// STYLE
import {
  Heading,
  Box,
  Text,
  Container,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import { Fragment } from "react";

const BestSellers = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await getProducts("sold", "desc", products?.length);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
      toast("Failed to load products", "error");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

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
      <Container
        py={8}
        px={0}
        maxW={{
          base: "100%",
          sm: "35rem",
          md: "43.75rem",
          lg: "57.5rem",
          xl: "75rem",
          xxl: "87.5rem",
        }}
      >
        <Carousel gap={32}>
          {products.map((product) => (
            <Fragment key={product._id}>
              {loading ? (
                <Box
                  padding="6"
                  boxShadow="lg"
                  bg="white"
                  mb={2}
                  w={{
                    sm: "cardWidth.sm",
                    md: "cardWidth.md",
                    lg: "cardWidth.lg",
                  }}
                >
                  <SkeletonCircle size="10" />
                  <SkeletonText
                    pt={4}
                    noOfLines={3}
                    spacing="4"
                    skeletonHeight="2"
                  />
                </Box>
              ) : (
                <ProductCard
                  product={product}
                  isOpen={isOpen}
                  onOpen={onOpen}
                  onClose={onClose}
                />
              )}
            </Fragment>
          ))}
        </Carousel>
      </Container>
    </Box>
  );
};

export default BestSellers;

"use client";

//REACT
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// FUNCTIONS
import { getProduct, productStar, getRelated } from "@/functions/product";

// COMPONENTS
import DetailsProduct from "../page";
import ProductCard from "@/components/cards/ProductCard";
import Header from "@/components/nav/Header";
import Footer from "@/components/nav/Footer";

// STYLE
import {
  Flex,
  Box,
  Text,
  Tabs,
  TabPanels,
  TabPanel,
  TabList,
  Tab,
  Heading,
  Center,
  Spinner,
} from "@chakra-ui/react";

interface Props {
  slug: string;
}

function SingleProduct(props: Props) {
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  const [star, setStar] = useState();
  const user = useSelector((state) => state.userReducer.user);
  const slug = props.slug;

  useEffect(() => {
    setIsLoading(true);
    loadSingleProduct();
    setIsLoading(false);
  }, [slug]);

  // Set initial modal star value
  useEffect(() => {
    let existingRatingObject = product.ratings?.find(
      (ele) => ele.postedBy.toString() === user._id?.toString(),
    );
    existingRatingObject && setStar(existingRatingObject.star); // current user's star
  }, []);

  const loadSingleProduct = async () => {
    const productsResponse = await getProduct(slug);
    setProduct(productsResponse.data);
    const relatedResponse = await getRelated(productsResponse.data._id);
    setRelated(relatedResponse.data);
  };

  const onStarClick = async (newRating, productId) => {
    if (user) {
      setStar(newRating);
      await productStar(productId, newRating, user.token);
      loadSingleProduct();
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <>
      {isLoading && (
        <Center
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="rgba(0, 0, 0, 0.2)"
        >
          <Spinner size="xl" color="primary.500" />
        </Center>
      )}
      <>
        <Header />
        <Box w="100%">
          <DetailsProduct
            product={product}
            onStarClick={onStarClick}
            star={star}
          />

          <Tabs
            onChange={(index) => setActiveTab(index)}
            variant="enclosed"
            size="lg"
            p={4}
          >
            <TabList>
              {["Details", "Reviews"].map((item, index) => (
                <Tab
                  key={index}
                  fontSize="2xl"
                  fontWeight="700"
                  color={activeTab === index ? "primary.500" : "gray.600"}
                  borderTopColor={
                    activeTab === index ? "primary.500" : "inherit"
                  }
                  bg={activeTab === index ? "#fff" : "inherit"}
                  _hover={{
                    bg: activeTab === index ? "#fff" : "gray.100",
                  }}
                >
                  {item}
                </Tab>
              ))}
            </TabList>

            <TabPanels>
              <TabPanel p={0}>
                <TabPanel fontSize="lg">{product?.description}</TabPanel>
              </TabPanel>
            </TabPanels>
          </Tabs>

          <Box mx={4}>
            <Heading textAlign="center" size="lg" my={4}>
              Related Products
            </Heading>
            <Flex py={2} flexWrap="wrap" justifyContent="space-around">
              {related?.length ? (
                related?.map((r) => (
                  <Box key={r._id} my={2}>
                    <ProductCard product={r} />
                  </Box>
                ))
              ) : (
                <Text textAlign="center">No Products Found</Text>
              )}
            </Flex>
          </Box>
        </Box>
        <Footer />
      </>
    </>
  );
}

export default SingleProduct;

"use client";

// HOOKS
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// FUNCTIONS
import { getCategories } from "../../functions/category";
import { getSubs } from "../../functions/sub";
import {
  fetchProductsByFilter,
  getProductsByCount,
} from "../../functions/product";

// COMPONENTS
import ProductCard from "../../components/cards/ProductCard";
import Accordion from "../../components/Accordion";
import Header from "../../components/nav/Header";
import Footer from "../../components/nav/Footer";

// STYLE
import {
  Heading,
  Box,
  Flex,
  Text,
  Center,
  Spinner,
  SimpleGrid,
  Select,
} from "@chakra-ui/react";
import { ArrowUpDownIcon } from "@chakra-ui/icons";

const Shop = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState([0, 4999]);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [subs, setSubs] = useState([]);
  const [subIds, setSubIds] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [shipping, setShipping] = useState("");
  const [sortBy, setSortBy] = useState("");
  const { text } = useSelector((state) => state.searchReducer.searchText);

  const loadProducts = async () => {
    const response = await getProductsByCount();
    setTimeout(() => {
      setProducts(response.data);
      setIsLoading(false);
    }, 10);
  };

  const loadCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadSubs = async () => {
    try {
      const response = await getSubs();
      setSubs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadProductsByFilter = async (filter) => {
    try {
      const response = await fetchProductsByFilter(filter);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    loadProducts();
    loadCategories();
    loadSubs();
  }, []);

  // 2. load products on user search input
  useEffect(() => {
    if (!text) {
      loadProducts();
    } else {
      const delayed = setTimeout(() => {
        loadProductsByFilter({ query: text });
      }, 300);
      return () => clearTimeout(delayed);
    }
  }, [text]);

  // 3. load products based on filters
  useEffect(() => {
    loadProductsByFilter({
      query: text ? text : "",
      price,
      category: categoryIds,
      sub: subIds,
      brand: brands,
      color: colors,
      shipping,
      sortBy,
    });
  }, [price, categoryIds, subIds, brands, colors, shipping, sortBy, text]);

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setCategoryIds((prevCategoryIds) =>
      prevCategoryIds.includes(categoryId)
        ? prevCategoryIds.filter((id) => id !== categoryId)
        : [...prevCategoryIds, categoryId],
    );
  };

  const handleSubChange = (e) => {
    const subId = e.target.value;
    setSubIds((prevSubIds) =>
      prevSubIds.includes(subId)
        ? prevSubIds.filter((id) => id !== subId)
        : [...prevSubIds, subId],
    );
  };

  const handleBrandChange = (e) => {
    const brand = e.target.value;
    setBrands((prevBrands) =>
      prevBrands.includes(brand)
        ? prevBrands.filter((id) => id !== brand)
        : [...prevBrands, brand],
    );
  };
  const handleColorChange = (e) => {
    const color = e.target.value;
    setColors((prevColors) =>
      prevColors.includes(color)
        ? prevColors.filter((id) => id !== color)
        : [...prevColors, color],
    );
  };

  const handleSlider = (value) => {
    setPrice(value);
  };

  const handleShippingchange = (value) => {
    setShipping(value);
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
        <Flex direction={{ sm: "column", md: "row" }} minHeight="100vh">
          <Accordion
            handleSlider={handleSlider}
            categories={categories}
            categoryIds={categoryIds}
            handleCategoryChange={handleCategoryChange}
            subs={subs}
            subIds={subIds}
            handleSubChange={handleSubChange}
            brands={brands}
            handleBrandChange={handleBrandChange}
            colors={colors}
            handleColorChange={handleColorChange}
            handleShippingchange={handleShippingchange}
          />
          <Flex direction="column" w="100%" overflowX="hidden" bg="#e9ecef">
            <Heading size="lg" color="primary.500" px={10} pt={10}>
              Products
            </Heading>
            <Flex>
              <Select
                w="unset"
                mt={10}
                mx={10}
                bg="#fff"
                borderColor="gray"
                variant="outline"
                cursor="pointer"
                icon={<ArrowUpDownIcon h="10px" />}
                focusBorderColor="primary.500"
                iconSize={14}
                _hover={{
                  opacity: "0.8",
                }}
                onChange={(event) => setSortBy(event.target.value)}
              >
                <option value="">Sort by: all</option>
                <option value="price:asc">price: cheaper</option>
                <option value="price:desc">price: more expensive</option>
              </Select>
            </Flex>

            <Box overflowY="hidden">
              {products?.length ? (
                <SimpleGrid
                  minChildWidth={{
                    sm: "cardWidth.sm",
                    md: "cardWidth.md",
                    lg: "cardWidth.lg",
                  }}
                  spacing={10}
                  pe={10}
                >
                  {products?.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </SimpleGrid>
              ) : (
                <Text p={10}>No products found</Text>
              )}
            </Box>
          </Flex>
        </Flex>
        <Footer />
      </>
    </>
  );
};
export default Shop;

// HOOKS
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// FUNCTIONS
import { getCategories } from "../functions/category";
import { getSubs } from "../functions/sub";
import {
  getProductsByCount,
  fetchProductsByFilter,
} from "../functions/product";

// COMPONENTS
import ProductCard from "@/components/cards/ProductCard";
import Accordion from "@/components/Accordion";
import Header from "@/components/nav/Header";
import Footer from "@/components/nav/Footer";

// STYLE
import {
  Heading,
  Box,
  Flex,
  Text,
  Center,
  Spinner,
  SimpleGrid,
} from "@chakra-ui/react";
const Shop = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState([0, 4999]);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [subs, setSubs] = useState([]);
  const [subIds, setSubIds] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [shipping, setShipping] = useState("");
  const search = useSelector((state) => state.searchReducer.searchText);
  const { text } = search;
  const loadAllProducts = () => {
    getProductsByCount(12).then((p) => {
      setTimeout(() => {
        setProducts(p.data);
        setLoading(false);
      }, 10);
    });
  };

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };
  // 1. load products by default on page load
  useEffect(() => {
    setLoading(true);
    loadAllProducts();
    getCategories().then((res) => setCategories(res.data));
    getSubs().then((res) => setSubs(res.data));
  }, []);
  // 2. load products on user search input
  useEffect(() => {
    if (!text) {
      loadAllProducts();
    } else {
      const delayed = setTimeout(() => {
        fetchProducts({ query: text });
      }, 300);
      return () => clearTimeout(delayed);
    }
  }, [text]);
  // 3. load products based on filters
  useEffect(() => {
    fetchProducts({
      query: text ? text : "",
      price,
      category: categoryIds,
      sub: subIds,
      brand: brands,
      color: colors,
      shipping,
    });
  }, [price, categoryIds, subIds, brands, colors, shipping, text]);
  // onChange handlers
  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setCategoryIds((prevCategoryIds) =>
      prevCategoryIds.includes(categoryId)
        ? // if  ID already exists remove it
          prevCategoryIds.filter((id) => id !== categoryId)
        : [...prevCategoryIds, categoryId],
    );
  };
  const handleSubChange = (e) => {
    const subId = e.target.value;
    setSubIds((prevSubIds) =>
      prevSubIds.includes(subId)
        ? // if  ID already exists remove it
          prevSubIds.filter((id) => id !== subId)
        : [...prevSubIds, subId],
    );
  };
  const handleBrandChange = (e) => {
    const brand = e.target.value;
    setBrands((prevBrands) =>
      prevBrands.includes(brand)
        ? // if  ID already exists remove it
          prevBrands.filter((id) => id !== brand)
        : [...prevBrands, brand],
    );
  };
  const handleColorChange = (e) => {
    const color = e.target.value;
    setColors((prevColors) =>
      prevColors.includes(color)
        ? // if  ID already exists remove it
          prevColors.filter((id) => id !== color)
        : [...prevColors, color],
    );
  };
  const handleSlider = (value) => {
    setPrice(value);
  };
  const handleShippingchange = (value) => {
    setShipping(value);
  };
  return (
    <>
      {loading && (
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
          <Box w="100%" overflowX="hidden" bg="#e9ecef">
            <Box overflowY="hidden">
              <Heading size="lg" color="primary.500" p={10}>
                Products
              </Heading>
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
          </Box>
        </Flex>
        <Footer />
      </>
    </>
  );
};
export default Shop;

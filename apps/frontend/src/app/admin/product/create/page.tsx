"use client";

// HOOKS
import { useState, useEffect } from "react";
import { useToast } from "../../../../utils/toast";
import { useSelector } from "react-redux";

// FUNCTIONS
import { createProduct } from "../../../../functions/product";
import { getCategories, getCategorySubs } from "../../../../functions/category";

// COMPONENTS
import ProductCreateForm from "../../../../components/forms/ProductCreateForm";
import FileUpload from "../../../../components/forms/FileUpload";

// STYLE
import { Button, Flex, Box, Heading, Card, CardBody } from "@chakra-ui/react";
import Link from "next/link";

// ASSETS
import { ArrowBackIcon } from "@chakra-ui/icons";

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  shipping: "No",
  quantity: "1",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "Asus"],
  color: "",
  brand: "",
};
const ProductCreate = () => {
  const user = useSelector((state) => state.userReducer.user);
  const toast = useToast();
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(values, user.token);
      toast("Product created!", "success");
    } catch (err) {
      toast("Failed to create product", "error");
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCatagoryChange = (e) => {
    e.preventDefault();
    setValues({ ...values, subs: [], category: e.target.value });
    getCategorySubs(e.target.value).then((res) => {
      setSubOptions(res.data);
    });
  };

  const loadCategories = () => {
    getCategories(setValues, values);
  };
  useEffect(() => {
    loadCategories();
  }, []);

  // PRICE & QUANTITY STEPPERS
  const incrementPrice = () => {
    const newPrice = Number(values.price) + 0.1;
    setValues({ ...values, price: newPrice.toFixed(1) });
  };
  const decrementPrice = () => {
    if (Number(values.price && Number(values.price) > 0)) {
      const newPrice = Number(values.price) - 0.1;
      setValues({ ...values, price: newPrice.toFixed(1) });
    }
  };
  const incrementQuantity = () => {
    const newQuantity = Number(values.quantity) + 1;
    setValues({ ...values, quantity: newQuantity.toFixed(0) });
  };
  const decrementQuantity = () => {
    if (Number(values.quantity && Number(values.quantity) > 1)) {
      const newQuantity = Number(values.quantity) - 1;
      setValues({ ...values, quantity: newQuantity.toFixed(0) });
    }
  };
  return (
    <Box overflowY="hidden">
      <Flex align={"center"}>
        <Button
          as={Link}
          href="/admin/products"
          leftIcon={<ArrowBackIcon />}
          type="button"
          size="sm"
          variant={"link"}
          colorScheme="primary"
        ></Button>
        <Heading size="lg" color="primary.500" my={5}>
          Create a product
        </Heading>
      </Flex>

      <Card my={2}>
        <CardBody>
          <FileUpload values={values} setValues={setValues} />
          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
            handleCatagoryChange={handleCatagoryChange}
            subOptions={subOptions}
            setValues={setValues}
            incrementPrice={incrementPrice}
            decrementPrice={decrementPrice}
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
          />
        </CardBody>
      </Card>
    </Box>
  );
};

export default ProductCreate;

// REACT
import { useState } from "react";

// REDUX
import { useSelector } from "react-redux";

// FUNCTIONS
import { createCategory } from "@/functions/category";

// STYLE
import { Box, Heading, Card, CardBody } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import CategoryForm from "@/components/forms/CategoryForm";
import { Button, Flex, useToast } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

const initialState = {
  name: "",
  images: [],
};

function CreateCategory() {
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(initialState);

  const user = useSelector((state) => state.user.loggedInUser);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // CREATE CATEGORY
    try {
      const res = await createCategory(values, user.token);
      setLoading(false);
      setValues(initialState);
      toast({
        title: `"${res?.data?.resp?.name}" is created!`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/admin/category");
    } catch (err) {
      setLoading(false);
      toast({
        title: err?.response.data?.message ?? "Failed to create category",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <Box overflowY="hidden">
      <Flex justify={"space-between"} align={"center"}>
        <Flex align={"center"}>
          <Button
            leftIcon={<ArrowBackIcon />}
            type="button"
            size="sm"
            variant={"link"}
            colorScheme="primary"
            onClick={() => navigate("/admin/category")}
          ></Button>
          <Heading size="lg" color="primary.500" my={5}>
            Categories
          </Heading>
        </Flex>
      </Flex>
      <Card my={2}>
        <CardBody>
          <CategoryForm
            values={values}
            setValues={setValues}
            label="category"
            handleSubmit={handleSubmit}
            loading={loading}
          />
        </CardBody>
      </Card>
    </Box>
  );
}

export default CreateCategory;

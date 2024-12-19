// REACT
import { useState, useEffect } from "react";
import { Button, Flex, useToast } from "@chakra-ui/react";

// REDUX
import { useSelector } from "react-redux";

// FUNCTIONS
import { getCategory, updateCategory } from "@/functions/category";

// STYLE
import { Box, Heading, Card, CardBody } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import CategoryForm from "@/components/forms/CategoryForm";
import { ArrowBackIcon } from "@chakra-ui/icons";

const CategoryUpdate = () => {
  const params = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  // LOGGED IN USER
  const user = useSelector((state) => state.userReducer.user);

  // STATE
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({});

  useEffect(() => {
    getCategory(params.slug).then((c) => setValues(c.data?.category));
  }, [params.slug]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await updateCategory(params.slug, values, user.token);
      setLoading(false);
      setValues();

      toast({
        title: `"${res.data?.data?.name}" is updated`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/admin/category");
    } catch (err) {
      setLoading(false);
      toast({
        title: "Failed to update category",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box overflowY="hidden">
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
          Update a category
        </Heading>
      </Flex>

      <Card my={2}>
        <CardBody>
          <CategoryForm
            values={values}
            setValues={setValues}
            label="category"
            handleSubmit={handleSubmit}
            loading={loading}
            setLoading={setLoading}
          />
        </CardBody>
      </Card>
    </Box>
  );
};

export default CategoryUpdate;

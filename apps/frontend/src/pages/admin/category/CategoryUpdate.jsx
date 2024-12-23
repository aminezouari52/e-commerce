// HOOKS
import { useState, useEffect } from "react";
import useToast from "@/utils/toast";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import CategoryForm from "@/components/forms/CategoryForm";

// FUNCTIONS
import { getCategory, updateCategory } from "@/functions/category";

// STYLE
import { Box, Button, Flex, Heading, Card, CardBody } from "@chakra-ui/react";
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
      toast(`${res.data?.data?.name} is updated`, "success");
      navigate("/admin/category");
    } catch (err) {
      setLoading(false);
      toast("Failed to update category", "error");
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

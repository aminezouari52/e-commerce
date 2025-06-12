"use client";

// HOOKS
import { useState, useEffect } from "react";
import { useToast } from "../../../../utils/toast";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";

import CategoryForm from "../../../../components/forms/CategoryForm";

// FUNCTIONS
import { getCategory, updateCategory } from "../../../../functions/category";

// STYLE
import { Box, Button, Flex, Heading, Card, CardBody } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

const update = () => {
  const params = useParams();
  const router = useRouter();
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
      // TODO: fix error
      setValues();
      toast(`${res.data?.data?.name} is updated`, "success");
      router.push("/admin/category");
    } catch (err) {
      setLoading(false);
      toast("Failed to update category", "error");
    }
  };

  return (
    <Box overflowY="hidden">
      <Flex align={"center"}>
        <Button
          as={Link}
          leftIcon={<ArrowBackIcon />}
          href="/admin/category"
          type="button"
          size="sm"
          variant={"link"}
          colorScheme="primary"
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

export default update;

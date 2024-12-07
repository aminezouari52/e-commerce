import {
  Flex,
  Button,
  FormLabel,
  Input,
  useToast,
  Select,
} from "@chakra-ui/react";
import FileUpload from "./FileUpload";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { getParentCategories } from "../../functions/category";

const CategoryForm = ({
  setValues,
  handleSubmit,
  values,
  loading,
  setLoading,
  label,
}) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [categories, setCategories] = useState([]);

  const user = useSelector((state) => state.user.loggedInUser);
  const loadCategories = () => {
    getParentCategories().then((c) => setCategories(c.data?.data));
  };
  useEffect(() => {
    loadCategories();
  }, []);
  function handleParentCategory(event) {
    setValues({ ...values, parent: event?.target?.value });
  }
  return (
    <Flex as="form" direction="column" onSubmit={handleSubmit}>
      <FormLabel>{label}</FormLabel>
      <Input
        focusBorderColor="primary.500"
        value={values?.name}
        onChange={(e) => setValues({ ...values, name: e.target.value })}
        placeholder="Name"
        mb={2}
      />
      <Select
        onChange={handleParentCategory}
        mb={2}
        value={values?.parent}
        placeholder="Parent Category"
      >
        {categories?.length > 0 &&
          categories?.map((item) => {
            return <option value={item?._id}>{item?.name}</option>;
          })}
        {/* <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option> */}
      </Select>
      <FileUpload
        values={values}
        setValues={setValues}
        setLoading={setLoading}
        loading={loading}
      />
      <Flex justifyContent="flex-end">
        <Button
          type="submit"
          isDisabled={!values?.name}
          isLoading={loading}
          colorScheme="primary"
          my={2}
          size="sm"
        >
          Save
        </Button>
      </Flex>
    </Flex>
  );
};

export default CategoryForm;

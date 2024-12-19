import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getAddress } from "@/functions/address";
import {
  Box,
  Heading,
  Editable,
  EditablePreview,
  EditableInput,
  Text,
} from "@chakra-ui/react";

const Account = () => {
  const user = useSelector((state) => state.userReducer.user);
  const [address, setAddress] = useState();

  const loadAddress = async () => {
    try {
      const newAddress = await getAddress(user?._id);
      console.log(newAddress.data);
      setAddress(newAddress.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user && user?.token) {
      loadAddress();
    }
  }, [user]);

  return (
    <Box>
      <Heading size="lg" color="primary.500" my={5}>
        Account
      </Heading>
      <Heading size="md" color="primary.500" my={5}>
        Personal Information
      </Heading>
      <Text>{user?.name}</Text>
      <Text>{user?.email}</Text>
      <Text>{address?.address}</Text>
      <Text>Phone</Text>
      <Editable defaultValue="Take some chakra" bg="#fff">
        <EditablePreview />
        <EditableInput onChange={(e) => console.log(e.target.value)} />
      </Editable>
    </Box>
  );
};

export default Account;

// HOOKS
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useToast } from "@/utils/toast";

// FUNCTIONS
import { getUserAddress, updateAddress } from "@/functions/address";
import { updateUser } from "@/functions/user";
import { auth } from "@/firebase";
import { updatePassword } from "firebase/auth";
import { setUser } from "@/reducers/userReducer";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// STYLE
import {
  Box,
  Heading,
  Input,
  Stack,
  FormControl,
  FormLabel,
  FormHelperText,
  Flex,
  Avatar,
  Button,
  Text,
  Icon,
  Divider,
} from "@chakra-ui/react";

// ASSETS
import { EmailIcon } from "@chakra-ui/icons";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";

const schema = yup
  .object({
    name: yup.string().required(),
    address: yup.string().required(),
    phone: yup.string().required(),
  })
  .required();

const Account = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordIsLoading, setPasswordIsLoading] = useState(false);

  const [password, setPassword] = useState("");

  const user = useSelector((state) => state.userReducer.user);
  const toast = useToast();
  const dispatch = useDispatch();
  const [address, setAddress] = useState();
  const methods = useForm({ resolver: yupResolver(schema) });

  const loadAddress = async () => {
    try {
      const newAddress = await getUserAddress(user?._id);
      setAddress(newAddress.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user && user?.token) {
      loadAddress();
      methods.reset({
        name: user?.name || "",
        address: (user && address?.address) || "",
        phone: user?.phone || "",
      });
    }
  }, [user, address?.address]);

  const onSubmit = async (values) => {
    if (user && user?.token) {
      try {
        setIsLoading(true);
        const { _id } = address;
        await updateAddress(user?.token, _id, { address: values.address });
        const updatedUser = await updateUser(
          { id: user?._id, token: user?.token },
          { phone: values.phone, name: values.name },
        );
        dispatch(setUser({ ...user, ...updatedUser.data }));
        toast("Updated successfully", "success");
      } catch (error) {
        console.log(error);
        toast("User did not updated successfully", "error");
      }
      setIsLoading(false);
    }
  };

  const updatePasswordHandler = async (e) => {
    e.preventDefault();
    setPasswordIsLoading(true);
    try {
      await updatePassword(auth.currentUser, password);
      setPassword("");
      toast("Password updated!", "success");
    } catch (err) {
      toast("Failed to update password", "error");
    }
    setPasswordIsLoading(false);
  };

  return (
    <Box>
      <Heading size="lg" color="primary.500" my={5}>
        Account
      </Heading>
      <Flex gap={4} my={5}>
        <Avatar size="lg" src="" />
        <Flex flexDirection="column" gap={2}>
          <Heading size="md">
            Welcome {user && user?.name && `, ${user?.name}`}!
          </Heading>
          <Box>
            <Flex alignItems="center" gap={1}>
              <Icon color="#000" as={EmailIcon} />
              <Text fontWeight="normal">{user?.email}</Text>
            </Flex>
            {user && address && (
              <Flex alignItems="center" gap={1}>
                <Icon color="#000" as={FaLocationDot} />
                <Text fontWeight="normal">{address.address}</Text>
              </Flex>
            )}
            {user && user?.phone && (
              <Flex alignItems="center" gap={1}>
                <Icon color="#000" as={FaPhoneAlt} />
                <Text fontWeight="normal">{user?.phone}</Text>
              </Flex>
            )}
          </Box>
        </Flex>
      </Flex>
      <Divider w="100%" h="1px" bg="gray.400" />
      <Flex w="100%" justifyContent="space-between" gap={8}>
        <Box w="50%">
          <Heading size="md" color="primary.500" my={5}>
            Personal Information
          </Heading>
          <Stack
            as="form"
            borderRadius="md"
            p={4}
            bg="#fff"
            spacing={4}
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <FormControl display="flex" gap={4}>
              <FormLabel w="80px" color="gray.600" fontWeight="semibold" m={0}>
                Name
              </FormLabel>
              <Box>
                <Input
                  w="200px"
                  size="sm"
                  type="text"
                  focusBorderColor={
                    methods.formState.errors.name?.message
                      ? "deepRed.500"
                      : "primary.500"
                  }
                  borderColor={
                    methods.formState.errors.name?.message
                      ? "deepRed.500"
                      : "inherit"
                  }
                  _hover={{
                    borderColor: methods.formState.errors.name?.message
                      ? "deepRed.500"
                      : "inherit",
                  }}
                  {...methods.register("name")}
                />
                <FormHelperText color="deepRed.500">
                  {methods.formState.errors.name?.message}
                </FormHelperText>
              </Box>
            </FormControl>
            <FormControl display="flex" gap={4}>
              <FormLabel
                w="80px"
                color="gray.600"
                htmlFor="address"
                fontWeight="semibold"
                m={0}
              >
                Address
              </FormLabel>
              <Box>
                <Input
                  w="200px"
                  size="sm"
                  type="text"
                  placeholder="enter your address"
                  focusBorderColor={
                    methods.formState.errors.address?.message
                      ? "deepRed.500"
                      : "primary.500"
                  }
                  borderColor={
                    methods.formState.errors.address?.message
                      ? "deepRed.500"
                      : "inherit"
                  }
                  _hover={{
                    borderColor: methods.formState.errors.address?.message
                      ? "deepRed.500"
                      : "inherit",
                  }}
                  {...methods.register("address")}
                />
                <FormHelperText color="deepRed.500">
                  {methods.formState.errors.address?.message}
                </FormHelperText>
              </Box>
            </FormControl>
            <FormControl display="flex" gap={4}>
              <FormLabel w="80px" color="gray.600" fontWeight="semibold" m={0}>
                Phone
              </FormLabel>
              <Box>
                <Input
                  type="text"
                  w="200px"
                  placeholder="enter your phone number"
                  size="sm"
                  focusBorderColor={
                    methods.formState.errors.phone?.message
                      ? "deepRed.500"
                      : "primary.500"
                  }
                  borderColor={
                    methods.formState.errors.phone?.message
                      ? "deepRed.500"
                      : "inherit"
                  }
                  _hover={{
                    borderColor: methods.formState.errors.phone?.message
                      ? "deepRed.500"
                      : "inherit",
                  }}
                  {...methods.register("phone")}
                />
                <FormHelperText color="deepRed.500">
                  {methods.formState.errors.phone?.message}
                </FormHelperText>
              </Box>
            </FormControl>
            <Flex justifyContent="flex-end">
              <Button
                bg="primary.500"
                color="#fff"
                size="sm"
                _hover={{
                  opacity: 0.8,
                }}
                isLoading={isLoading}
                type="submit"
              >
                Save
              </Button>
            </Flex>
          </Stack>
        </Box>
        <Box w="50%">
          <Heading size="md" color="primary.500" my={5}>
            Update Password
          </Heading>
          <Stack borderRadius="md" p={4} bg="#fff" spacing={4}>
            <FormControl display="flex" gap={4}>
              <FormLabel w="120px" color="gray.600" fontWeight="semibold" m={0}>
                New password
              </FormLabel>
              <Box>
                <Input
                  w="200px"
                  size="sm"
                  type="password"
                  placeholder="your new password"
                  focusBorderColor={
                    methods.formState.errors.name?.message
                      ? "deepRed.500"
                      : "primary.500"
                  }
                  borderColor={
                    methods.formState.errors.name?.message
                      ? "deepRed.500"
                      : "inherit"
                  }
                  _hover={{
                    borderColor: methods.formState.errors.name?.message
                      ? "deepRed.500"
                      : "inherit",
                  }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FormHelperText color="deepRed.500">
                  {methods.formState.errors.name?.message}
                </FormHelperText>
              </Box>
            </FormControl>
            <Flex justifyContent="flex-end">
              <Button
                bg="primary.500"
                color="#fff"
                size="sm"
                _hover={{
                  opacity: 0.8,
                }}
                isLoading={passwordIsLoading}
                onClick={updatePasswordHandler}
              >
                Save
              </Button>
            </Flex>
          </Stack>
        </Box>
      </Flex>
      <Divider mt={6} w="100%" h="1px" bg="gray.400" />
      <Flex w="100%" justifyContent="space-between" gap={8}>
        <Box w="50%">
          <Heading size="md" color="primary.500" my={5}>
            Billing Information
          </Heading>
          <Stack
            as="form"
            borderRadius="md"
            p={4}
            bg="#fff"
            spacing={4}
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <FormControl display="flex" gap={4}>
              <FormLabel w="140px" color="gray.600" fontWeight="semibold" m={0}>
                Billing address
              </FormLabel>
              <Box>
                <Input
                  w="200px"
                  size="sm"
                  type="text"
                  focusBorderColor={
                    methods.formState.errors.name?.message
                      ? "deepRed.500"
                      : "primary.500"
                  }
                  borderColor={
                    methods.formState.errors.name?.message
                      ? "deepRed.500"
                      : "inherit"
                  }
                  _hover={{
                    borderColor: methods.formState.errors.name?.message
                      ? "deepRed.500"
                      : "inherit",
                  }}
                  // {...methods.register("name")}
                />
                <FormHelperText color="deepRed.500">
                  {methods.formState.errors.name?.message}
                </FormHelperText>
              </Box>
            </FormControl>
            <FormControl display="flex" gap={4}>
              <FormLabel w="140px" color="gray.600" fontWeight="semibold" m={0}>
                Shipping address
              </FormLabel>
              <Box>
                <Input
                  w="200px"
                  size="sm"
                  type="text"
                  focusBorderColor={
                    methods.formState.errors.name?.message
                      ? "deepRed.500"
                      : "primary.500"
                  }
                  borderColor={
                    methods.formState.errors.name?.message
                      ? "deepRed.500"
                      : "inherit"
                  }
                  _hover={{
                    borderColor: methods.formState.errors.name?.message
                      ? "deepRed.500"
                      : "inherit",
                  }}
                  // {...methods.register("name")}
                />
                <FormHelperText color="deepRed.500">
                  {methods.formState.errors.name?.message}
                </FormHelperText>
              </Box>
            </FormControl>
            <Flex justifyContent="flex-end">
              <Button
                bg="primary.500"
                color="#fff"
                size="sm"
                _hover={{
                  opacity: 0.8,
                }}
                // isLoading={isLoading}
                // type="submit"
              >
                Save
              </Button>
            </Flex>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};

export default Account;

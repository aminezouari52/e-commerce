// HOOKS
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm, FormProvider } from "react-hook-form";
import { useToast } from "@/utils/toast";

// FUNCTIONS
import { updateUser } from "@/functions/user";
import { createOrder } from "@/functions/order";
import { createAddress } from "@/functions/address";
import { emptyGuestCart, emptyUserCart } from "@/reducers/cartReducer";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// COMPONENTS
import OrderSummary from "./OrderSummary";
import Header from "@/components/nav/Header";
import Footer from "@/components/nav/Footer";
import PlaceOrderModal from "./PlaceOrderModal";

// STYLE
import {
  Box,
  Heading,
  Flex,
  Text,
  Stack,
  useDisclosure,
  Select,
  Input,
  InputGroup,
  FormControl,
  FormLabel,
  InputLeftAddon,
  FormHelperText,
} from "@chakra-ui/react";

// ASSETS
import RadioCard from "@/components/RadioCard";
import { FaTruck } from "react-icons/fa";
import { IoStorefrontSharp } from "react-icons/io5";

const shippingTypeOptions = [
  { value: "ship", title: "Ship", icon: FaTruck },
  {
    value: "pickup-in-store",
    title: "Pick in store",
    icon: IoStorefrontSharp,
  },
];

const schema = yup
  .object({
    name: yup.string().required(),
    address: yup.string().required(),
    email: yup.string().required(),
    phone: yup.string().required(),
    paymentType: yup.string().required(),
  })
  .required();

const Checkout = () => {
  const user = useSelector((state) => state.userReducer.user);
  const guestCart = useSelector((state) => state.cartReducer.guestCart);
  const userCart = useSelector((state) => state.cartReducer.userCart);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [succeeded, setSucceeded] = useState(false);
  const [orderData, setOrderData] = useState();

  const methods = useForm({ resolver: yupResolver(schema) });

  const getTotal = () => {
    return products?.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const placeOrder = async () => {
    const { name, phone, email, shippingType, paymentType, address } =
      orderData;
    if (!products.length) {
      toast("No products", "warning");
      return;
    }

    const addressBody = {
      address,
      user: user ? user?._id : null,
    };

    const orderBody = {
      email,
      phone,
      name,
      shippingType,
      paymentType,
      amount: getTotal(),
      userId: user ? user?._id : null,
      products,
    };

    const userBody = {
      address,
      phone,
      name,
    };

    try {
      await createAddress(addressBody);
      await createOrder(orderBody);
      if (user) {
        await updateUser({ id: user?._id, token: user?.token }, userBody);
      }
    } catch (error) {
      console.log(error);
    }

    if (user && user?.token) dispatch(emptyUserCart());
    else dispatch(emptyGuestCart());
    setSucceeded(true);
    setProducts([]);
  };

  function onSubmit(values) {
    onOpen();
    setOrderData({ ...values, products });
  }

  useEffect(() => {
    if (user && user.token) {
      setProducts(userCart);
    } else {
      setProducts(guestCart);
    }
  }, [user, guestCart, userCart]);

  return (
    <>
      <Header />
      <FormProvider {...methods}>
        <Flex>
          <Stack spacing={6} bg="gray.100" w="100%" py={10} px={12}>
            <Heading size="lg" color="primary.500">
              Place order
            </Heading>
            <Heading fontSize="lg" lineHeight="6">
              Address information
            </Heading>
            <Flex direction="column" gap={8}>
              <Stack
                shadow="base"
                rounded="md"
                bg="#fff"
                spacing={8}
                py={6}
                px={12}
              >
                <Flex gap={4}>
                  <FormControl>
                    <FormLabel
                      htmlFor="name"
                      fontWeight="semibold"
                      color="gray.600"
                    >
                      Name
                    </FormLabel>
                    <Input
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
                      defaultValue={user?.name}
                      {...methods.register("name")}
                    />
                    <FormHelperText color="deepRed.500">
                      {methods.formState.errors.name?.message}
                    </FormHelperText>
                  </FormControl>
                  <FormControl>
                    <FormLabel
                      htmlFor="address"
                      fontWeight="semibold"
                      color="gray.600"
                    >
                      Address
                    </FormLabel>
                    <Input
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
                      type="text"
                      defaultValue={user?.address}
                      name="address"
                      {...methods.register("address")}
                    />
                    <FormHelperText color="deepRed.500">
                      {methods.formState.errors.address?.message}
                    </FormHelperText>
                  </FormControl>
                </Flex>

                <Flex gap={4}>
                  <FormControl>
                    <FormLabel
                      htmlFor="email"
                      fontWeight="semibold"
                      color="gray.600"
                    >
                      Email
                    </FormLabel>
                    <Input
                      type="email"
                      {...methods.register("email")}
                      focusBorderColor={
                        methods.formState.errors.email?.message
                          ? "deepRed.500"
                          : "primary.500"
                      }
                      borderColor={
                        methods.formState.errors.email?.message
                          ? "deepRed.500"
                          : "inherit"
                      }
                      _hover={{
                        borderColor: methods.formState.errors.email?.message
                          ? "deepRed.500"
                          : "inherit",
                      }}
                      defaultValue={user?.email}
                    />
                    <FormHelperText color="deepRed.500">
                      {methods.formState.errors.email?.message}
                    </FormHelperText>
                  </FormControl>

                  <FormControl>
                    <FormLabel
                      htmlFor="phone"
                      fontWeight="semibold"
                      color="gray.600"
                    >
                      Phone
                    </FormLabel>
                    <InputGroup>
                      <InputLeftAddon>+216</InputLeftAddon>
                      <Input
                        type="tel"
                        autoComplete="tel"
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
                        defaultValue={user?.phone}
                        {...methods.register("phone")}
                      />
                    </InputGroup>
                    <FormHelperText color="deepRed.500">
                      {methods.formState.errors.phone?.message}
                    </FormHelperText>
                  </FormControl>
                </Flex>

                <Box>
                  <Text fontSize="md" fontWeight="bold" color="gray.700" mb={3}>
                    Shipping type
                  </Text>

                  <RadioCard
                    options={shippingTypeOptions}
                    defaultValue="ship"
                    fieldMethods={methods.register("shippingType")}
                  />
                </Box>

                <FormControl>
                  <FormLabel
                    htmlFor="paymentType"
                    fontWeight="semibold"
                    color="gray.600"
                  >
                    Payment type
                  </FormLabel>
                  <Select
                    id="paymentType"
                    focusBorderColor={
                      methods.formState.errors.paymentType?.message
                        ? "deepRed.500"
                        : "primary.500"
                    }
                    borderColor={
                      methods.formState.errors.paymentType?.message
                        ? "deepRed.500"
                        : "inherit"
                    }
                    _hover={{
                      borderColor: methods.formState.errors.paymentType?.message
                        ? "deepRed.500"
                        : "inherit",
                    }}
                    defaultValue="solde"
                    {...methods.register("paymentType")}
                  >
                    <option value="transfer">virement</option>
                    <option value="cash">cash</option>
                    <option value="card">card</option>
                  </Select>
                  <FormHelperText color="deepRed.500">
                    {methods.formState.errors.country?.message}
                  </FormHelperText>
                </FormControl>
              </Stack>
            </Flex>
          </Stack>

          <OrderSummary
            products={products}
            total={getTotal()}
            onOpen={methods.handleSubmit(onSubmit)}
          />
        </Flex>

        <PlaceOrderModal
          isOpen={isOpen}
          onClose={onClose}
          total={getTotal()}
          succeeded={succeeded}
          placeOrder={placeOrder}
        />
      </FormProvider>
      <Footer />
    </>
  );
};

export default Checkout;

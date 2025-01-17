// HOOKS
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useToast from "@/utils/toast";

// FUNCTIONS
import {
  updateGuestProductCount,
  deleteGuestProduct,
  addGuestProduct,
  addUserProduct,
  updateUserProductCount,
  deleteUserProduct,
} from "@/reducers/cartReducer";

// STYLE
import {
  Box,
  Image,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Stack,
  Divider,
  Flex,
  Text,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";

const CartDrawer = ({ isOpen, onClose, cartButtonRef }) => {
  const guestCart = useSelector((state) => state.cartReducer.guestCart);
  const userCart = useSelector((state) => state.cartReducer.userCart);

  const user = useSelector((state) => state.userReducer.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const [products, setProducts] = useState([]);

  const getTotal = () => {
    return products
      .reduce((currentValue, nextValue) => {
        return currentValue + nextValue.count * nextValue.price;
      }, 0)
      .toFixed(2);
  };

  const proceedToCheckoutHandler = async () => {
    onClose();
    navigate("/checkout");
  };

  const updateProductCountHandler = async (value, product) => {
    let count = +value;

    if (/\D/.test(`${count}`)) return;

    if (count > product?.quantity) {
      toast(`Max available quantity: ${product?.quantity}`, "error");
      return;
    }

    if (user && user.token) {
      dispatch(
        updateUserProductCount({
          productId: product._id,
          count,
        }),
      );
    } else {
      dispatch(
        updateGuestProductCount({
          productId: product._id,
          count,
        }),
      );
    }
  };

  const incrementProductCountHandler = async (product) => {
    if (product?.count + 1 > product?.quantity) {
      toast(`Max available quantity: ${product.quantity}`, "error");
      return;
    }

    if (user && user.token) {
      dispatch(
        addUserProduct({
          product,
          count: 1,
        }),
      );
    } else {
      dispatch(
        addGuestProduct({
          product,
          count: 1,
        }),
      );
    }
  };

  const decrementProductCountHandler = async (product) => {
    if (product?.count - 1 < 1) {
      toast("Min available quantity: 0", "error");
      return;
    }

    if (user && user.token) {
      dispatch(
        addUserProduct({
          product,
          count: -1,
        }),
      );
    } else {
      dispatch(
        addGuestProduct({
          product,
          count: -1,
        }),
      );
    }
  };

  const deleteProductHandler = async (product) => {
    if (user && user.token) {
      dispatch(dispatch(deleteUserProduct({ productId: product?._id })));
    } else {
      dispatch(dispatch(deleteGuestProduct({ productId: product?._id })));
    }
  };

  useEffect(() => {
    if (user && user.token) {
      setProducts(userCart);
    } else {
      setProducts(guestCart);
    }
  }, [user, guestCart, userCart]);

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={cartButtonRef}
      size="sm"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Cart</DrawerHeader>

        <DrawerBody as={Stack} bg="#fff" spacing={5}>
          <Divider size="lg" />
          {!products ||
            (products.length === 0 && <Text>Your cart is empty</Text>)}
          {products?.map((product, i) => (
            <Flex key={i} alignItems="center" gap={4}>
              <Box>
                <Image
                  src={product?.images.length ? product?.images[0].url : null}
                  h="auto"
                  w="100px"
                  maxWidth="180px"
                />
              </Box>
              <Flex
                fontSize="xs"
                w="100%"
                direction="column"
                justifyContent="space-between"
                gap={4}
              >
                <Flex justifyContent="space-between" fontWeight="bold">
                  <Text>{product?.title}</Text>
                  <Text>${(product?.price * product?.count).toFixed(2)}</Text>
                </Flex>
                <Flex direction="column">
                  <Flex>
                    <Text color="gray">color: </Text>
                    <Text>{product?.color}</Text>
                  </Flex>
                  <Flex>
                    <Text color="gray">brand: </Text>
                    <Text>{product?.brand}</Text>
                  </Flex>
                  <Flex>
                    <Text color="gray">category: </Text>
                    <Text>{product?.category?.name}</Text>
                  </Flex>
                </Flex>
                <Flex justifyContent="space-between" alignItems="center">
                  <Box maxW="90px">
                    <InputGroup size="xs">
                      <InputLeftAddon me="1px" p={0}>
                        <Button
                          variant="outline"
                          size="xs"
                          onClick={() => decrementProductCountHandler(product)}
                        >
                          -
                        </Button>
                      </InputLeftAddon>
                      <NumberInput
                        min={1}
                        max={product?.quantity}
                        focusBorderColor="primary.500"
                        p={0}
                        value={products[i]?.count}
                        onChange={(event) => {
                          updateProductCountHandler(event, product);
                        }}
                      >
                        <NumberInputField p={1} type="tel" />
                      </NumberInput>
                      <InputRightAddon ms="1px" p={0}>
                        <Button
                          variant="outline"
                          size="xs"
                          onClick={() => incrementProductCountHandler(product)}
                        >
                          +
                        </Button>
                      </InputRightAddon>
                    </InputGroup>
                  </Box>

                  <Box>
                    <Button
                      variant="link"
                      colorScheme="red"
                      size="xs"
                      onClick={() => deleteProductHandler(product)}
                    >
                      remove
                    </Button>
                  </Box>
                </Flex>
              </Flex>
            </Flex>
          ))}
          <Divider size="lg" />
          <Text>
            Total: <b>${getTotal()}</b>
          </Text>
          <Divider size="lg" />
        </DrawerBody>

        <DrawerFooter>
          <Button
            w="100%"
            mt={2}
            variant="solid"
            colorScheme="primary"
            isDisabled={!products?.length}
            onClick={proceedToCheckoutHandler}
            _hover={{ opacity: !products?.length ? 0.4 : 0.8 }}
          >
            Proceed to Checkout
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;

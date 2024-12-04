// HOOKS
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/react";

// FUNCTIONS
import {
  updateProductCount,
  incrementProductCount,
  decrementProductCount,
  removeProduct,
} from "@/reducers/cartReducer";
import { setUserCart } from "@/functions/user";

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
  const cart = useSelector((state) => state.cartReducer.cart);
  const user = useSelector((state) => state.userReducer.loggedInUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const saveOrderToDb = async () => {
    onClose();
    if (cart) {
      try {
        if (user && user?.token) {
          await setUserCart(cart, user.token);
        }
        navigate("/checkout");
      } catch (err) {
        console.log("cart save err", err);
      }
    }
  };

  const handleQuantityChange = (value, product) => {
    let count = +value;

    if (/\D/.test(`${count}`)) return;

    if (count > product?.quantity) {
      toast({
        title: `Max available quantity: ${product?.quantity}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    dispatch(updateProductCount({ _id: product._id, count }));
  };

  const incrementProductCountHandler = (product) => {
    if (product?.count + 1 > product?.quantity) {
      toast({
        title: `Max available quantity: ${product.quantity}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    dispatch(
      incrementProductCount({
        _id: product?._id,
      })
    );
  };

  const decrementProductCountHandler = (product) => {
    if (product?.count - 1 < 1) {
      toast({
        title: `Min available quantity: 0`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    dispatch(
      decrementProductCount({
        _id: product?._id,
      })
    );
  };

  const removeProductHandler = (product) => {
    dispatch(removeProduct({ _id: product?._id }));
  };

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
          {!cart || (cart.length === 0 && <Text>Your cart is empty</Text>)}
          {cart.map((product, i) => (
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
                        value={cart[i]?.count}
                        onChange={(event) => {
                          handleQuantityChange(event, product);
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
                      onClick={() => removeProductHandler(product)}
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
            Total: <b>${getTotal().toFixed(2)}</b>
          </Text>
          <Divider size="lg" />
        </DrawerBody>

        <DrawerFooter>
          <Button
            w="100%"
            mt={2}
            variant="solid"
            colorScheme="primary"
            isDisabled={!cart?.length}
            onClick={saveOrderToDb}
            _hover={{ opacity: !cart?.length ? 0.4 : 0.8 }}
          >
            Proceed to Checkout
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;

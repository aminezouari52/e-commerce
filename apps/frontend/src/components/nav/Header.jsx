// HOOKS
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";

// COMPONENTS
import Search from "@/components/forms/Search";
import HeaderButton from "./HeaderButton";
import HeaderDrawer from "./HeaderDrawer";
import HeaderMenu from "./HeaderMenu";
import CartDrawer from "./CartDrawer";

// STYLE
import { Box, Flex, Text, Image, IconButton, Badge } from "@chakra-ui/react";

// ASSETS
import logo from "@/assets/logo.png";
import { ChevronRightIcon } from "@chakra-ui/icons";
import CategoriesMenu from "./CategoriesMenu";
import { IoCartOutline } from "react-icons/io5";
import { IoCart } from "react-icons/io5";

const Header = () => {
  const navigate = useNavigate();
  const cartButtonRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useSelector((state) => state.userReducer.user);
  const cart = useSelector((state) => state.cartReducer.cart);

  return (
    <Box position="sticky" top="0" zIndex="11">
      <Flex
        justifyContent="center"
        alignItems="center"
        bgGradient="linear(to-r, rgba(64,64,64,1), rgba(0,0,0,1))"
        _hover={{ bg: "rgba(64, 64, 64, 1)" }}
        cursor="pointer"
        color="white"
      >
        <Text fontWeight="light" letterSpacing="2px" p={1} fontSize="sm">
          Get -50% off your first product
        </Text>
        <ChevronRightIcon fontSize="xl" />
      </Flex>

      <Flex
        as="header"
        justifyContent="space-between"
        background="#fff"
        h={{
          sm: "header.sm",
          md: "header.md",
          lg: "header.lg",
        }}
        w="100%"
        alignItems="center"
        px={{ sm: "12px", md: "24px", lg: "56px" }}
        shadow="md"
      >
        <Flex alignItems="center" gap="10px" height="100%">
          <HeaderDrawer />
          <HeaderButton pathname="/">
            <Text fontSize={{ sm: "sm", lg: "md" }}>Home</Text>
          </HeaderButton>
          <HeaderButton pathname="/shop">
            <Text fontSize={{ sm: "sm", lg: "md" }}>Shop</Text>
          </HeaderButton>
          <CategoriesMenu />
        </Flex>

        <Flex alignItems="center" justifyContent="center">
          <Image
            onClick={() => navigate("/")}
            src={logo}
            alt="logo"
            h={{ sm: "35px", md: "35px", lg: "44px" }}
            w={{ sm: "77px", md: "77px", lg: "96.8px" }}
            cursor="pointer"
            _hover={{
              opacity: 0.8,
            }}
          />
        </Flex>

        <Flex
          alignItems="center"
          justifyContent="flex-end"
          gap="10px"
          height="100%"
        >
          <Search />
          <CartDrawer
            isOpen={isOpen}
            onClose={onClose}
            cartButtonRef={cartButtonRef}
          />
          <Box pos="relative">
            <IconButton
              ref={cartButtonRef}
              borderTopLeftRadius="md"
              borderBottomLeftRadius="md"
              colorScheme="white"
              color="primary"
              size="sm"
              icon={
                isOpen ? (
                  <IoCart fontSize="16px" />
                ) : (
                  <IoCartOutline fontSize="18px" />
                )
              }
              onClick={() => onOpen()}
              // onClick={() => navigate("/cart")}
              _hover={{
                bg: "lightgray",
              }}
            />
            <Badge
              display={cart.length === 0 ? "none" : "flex"}
              pos="absolute"
              top="0"
              right="0"
              w="13px"
              h="13px"
              fontSize="2xs"
              justifyContent="center"
              alignItems="center"
              borderRadius="50%"
              colorScheme="deepRed"
              variant="solid"
              p={0}
            >
              {cart?.length}
            </Badge>
          </Box>
          {user ? (
            <HeaderMenu />
          ) : (
            <>
              <HeaderButton pathname="/auth/register" text="Register">
                <Text fontSize={{ sm: "sm", lg: "md" }}>Register</Text>
              </HeaderButton>
              <HeaderButton pathname="/auth/login" text="Login">
                <Text fontSize={{ sm: "sm", lg: "md" }}>Login</Text>
              </HeaderButton>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;

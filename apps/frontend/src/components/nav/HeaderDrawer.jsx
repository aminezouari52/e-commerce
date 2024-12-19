// HOOKS
import { useNavigate, useLocation } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";

// REDUX
import { useSelector } from "react-redux";

// COMPONENTS
import SideBar from "./SideBar";

// STYLE
import {
  Box,
  Flex,
  Text,
  Button,
  Icon,
  Badge,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/react";

// ICONS
import { HamburgerIcon } from "@chakra-ui/icons";
import { AiOutlineHome, AiOutlineShopping } from "react-icons/ai";
import { BsCart } from "react-icons/bs";

const HeaderDrawer = () => {
  const user = useSelector((state) => state.userReducer.user);
  const cart = useSelector((state) => state.cartReducer.cart);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box display={{ sm: "block", md: "none", lg: "none" }}>
      <Button
        variant="ghost"
        size="lg"
        onClick={onOpen}
        _hover={{
          bg: "lightgray",
        }}
      >
        <HamburgerIcon />
      </Button>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent style={{ width: "200px" }}>
          <Flex direction="column" alignItems="start" py={2} px={4}>
            <Button
              w="100%"
              justifyContent="start"
              variant="transparent-with-icon"
              leftIcon={<Icon as={AiOutlineHome} />}
              style={{
                color: location.pathname === "/" ? "primary.500" : "#000",
                fill: location.pathname === "/" ? "#adb5bd" : "#000",
                transition: "border-color ease-in-out 0.3s",
                borderRadius: "0px",
              }}
              onClick={() => navigate("/")}
            >
              <Text>Home</Text>
            </Button>
            <Button
              w="100%"
              justifyContent="start"
              variant="transparent-with-icon"
              leftIcon={<Icon as={AiOutlineShopping} />}
              style={{
                color: location.pathname === "/shop" ? "primary.500" : "#000",
                fill: location.pathname === "/shop" ? "#adb5bd" : "#000",
                transition: "border-color ease-in-out 0.3s",
                borderRadius: "0px",
              }}
              onClick={() => navigate("/shop")}
            >
              <Text>Shop</Text>
            </Button>
            <Button
              w="100%"
              justifyContent="start"
              variant="transparent-with-icon"
              leftIcon={<Icon as={BsCart} />}
              style={{
                color: location.pathname === "/cart" ? "primary.500" : "#000",
                fill: location.pathname === "/cart" ? "#adb5bd" : "#000",
                transition: "border-color ease-in-out 0.3s",
                borderRadius: "0px",
              }}
              onClick={() => navigate("/cart")}
            >
              <Flex alignItems="start">
                <Text>Cart</Text>
                <Badge borderRadius="50%" colorScheme="red" variant="solid">
                  {cart?.length}
                </Badge>
              </Flex>
            </Button>
          </Flex>
          <DrawerHeader py={2}>
            {user ? (user?.role === "admin" ? "Management" : "Settings") : ""}
          </DrawerHeader>
          <DrawerBody p={0}>
            <SideBar />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default HeaderDrawer;

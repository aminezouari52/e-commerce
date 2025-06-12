"use client";

// HOOKS
import { useEffect, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
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
import Link from "next/link";
import { usePathname } from "next/navigation";

const HeaderDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const pathname = usePathname();
  const user = useSelector((state) => state.userReducer.user);
  const guestCart = useSelector((state) => state.cartReducer.guestCart);
  const userCart = useSelector((state) => state.cartReducer.userCart);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (user && user.token) {
      setProducts(userCart);
    } else {
      setProducts(guestCart);
    }
  }, [user, guestCart, userCart]);

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
              as={Link}
              href="/"
              w="100%"
              justifyContent="start"
              variant="transparent-with-icon"
              leftIcon={<Icon as={AiOutlineHome} />}
              style={{
                color: pathname === "/" ? "primary.500" : "#000",
                fill: pathname === "/" ? "#adb5bd" : "#000",
                transition: "border-color ease-in-out 0.3s",
                borderRadius: "0px",
              }}
            >
              <Text>Home</Text>
            </Button>
            <Button
              as={Link}
              href="/shop"
              w="100%"
              justifyContent="start"
              variant="transparent-with-icon"
              leftIcon={<Icon as={AiOutlineShopping} />}
              style={{
                color: pathname === "/shop" ? "primary.500" : "#000",
                fill: pathname === "/shop" ? "#adb5bd" : "#000",
                transition: "border-color ease-in-out 0.3s",
                borderRadius: "0px",
              }}
            >
              <Text>Shop</Text>
            </Button>
            <Button
              as={Link}
              href="/cart"
              w="100%"
              justifyContent="start"
              variant="transparent-with-icon"
              leftIcon={<Icon as={BsCart} />}
              style={{
                color: pathname === "/cart" ? "primary.500" : "#000",
                fill: pathname === "/cart" ? "#adb5bd" : "#000",
                transition: "border-color ease-in-out 0.3s",
                borderRadius: "0px",
              }}
            >
              <Flex alignItems="start">
                <Text>Cart</Text>
                <Badge borderRadius="50%" colorScheme="red" variant="solid">
                  {products?.length}
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

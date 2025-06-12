"use client";

// HOOKS
import { useSelector } from "react-redux";

// STYLE
import { Box, Button, Icon, Stack } from "@chakra-ui/react";

// ICONS
import { AiOutlineHeart } from "react-icons/ai";
import { FaCubes, FaRegUser } from "react-icons/fa";
import { BiCube } from "react-icons/bi";
import { BsMouse2 } from "react-icons/bs";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { HiDesktopComputer } from "react-icons/hi";
import { ImPriceTags } from "react-icons/im";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideBar = () => {
  const pathname = usePathname();
  const user = useSelector((state) => state.userReducer.user);

  const userSideBar = [
    {
      title: "Account",
      icon: <Icon as={FaRegUser} mr={2} />,
      link: "/user/account",
    },
    {
      title: "Wishlist",
      icon: <Icon as={AiOutlineHeart} mr={2} />,
      link: "/user/wishlist",
    },
    {
      title: "orders",
      icon: <Icon as={ImPriceTags} mr={2} />,
      link: "/user/orders",
    },
  ];

  const adminSideBar = [
    {
      title: "Dashboard",
      icon: <Icon as={MdOutlineSpaceDashboard} mr={2} />,
      link: "/admin/dashboard",
    },
    {
      title: "Product",
      icon: <Icon as={BiCube} mr={2} />,
      link: "/admin/products/create",
    },
    {
      title: "Products",
      icon: <Icon as={FaCubes} mr={2} />,
      link: "/admin/products",
    },
    {
      title: "Category",
      icon: <Icon as={HiDesktopComputer} mr={2} />,
      link: "/admin/category",
    },
    {
      title: "Sub category",
      icon: <Icon as={BsMouse2} mr={2} />,
      link: "/admin/sub",
    },
  ];

  const sideBarElements = user
    ? user?.role === "user"
      ? userSideBar
      : user?.role === "admin"
        ? adminSideBar
        : []
    : [];

  return (
    <Stack spacing={4} direction="column" p={4} w="200px">
      {sideBarElements?.map((element) => (
        <Button
          as={Link}
          href={element?.link}
          key={element?.title}
          color={pathname === element?.link ? "#fff" : "#000"}
          fill={pathname === element?.link ? "#fff" : "#000"}
          colorScheme="transparent"
          justifyContent="start"
          _hover={{
            backgroundColor: "primary.500",
            color: "#fff",
            fill: "#fff",
          }}
          backgroundColor={pathname === element?.link && "primary.500"}
        >
          {element?.icon}
          <Box>{element?.title}</Box>
        </Button>
      ))}
    </Stack>
  );
};
export default SideBar;

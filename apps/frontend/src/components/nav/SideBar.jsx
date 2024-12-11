// HOOKS
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

// STYLE
import { Box, Button, Icon, Stack } from "@chakra-ui/react";

// ICONS
import { AiFillLock, AiOutlineHeart } from "react-icons/ai";
import { BsClockHistory } from "react-icons/bs";
import { FaCubes } from "react-icons/fa";
import { BiCube } from "react-icons/bi";
import { BsMouse2 } from "react-icons/bs";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { HiDesktopComputer } from "react-icons/hi";
import { ImPriceTags } from "react-icons/im";

const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userReducer.loggedInUser);

  const userSideBar = [
    {
      title: "History",
      icon: <Icon as={BsClockHistory} mr={2} />,
      link: "/user/history",
    },
    {
      title: "Wishlist",
      icon: <Icon as={AiOutlineHeart} mr={2} />,
      link: "/user/wishlist",
    },
    {
      title: "Password",
      icon: <Icon as={AiFillLock} mr={2} />,
      link: "/user/password",
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
          key={element?.title}
          color={location?.pathname === element?.link ? "#fff" : "#000"}
          fill={location?.pathname === element?.link ? "#fff" : "#000"}
          colorScheme="transparent"
          justifyContent="start"
          _hover={{
            backgroundColor: "primary.500",
            color: "#fff",
            fill: "#fff",
          }}
          backgroundColor={
            location?.pathname === element?.link && "primary.500"
          }
          onClick={() => navigate(element?.link)}
        >
          {element?.icon}
          <Box>{element?.title}</Box>
        </Button>
      ))}
    </Stack>
  );
};
export default SideBar;

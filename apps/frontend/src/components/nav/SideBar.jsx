// HOOKS
import { useNavigate, useLocation } from "react-router-dom";

// STYLE
import { Box, Button, Icon, Stack } from "@chakra-ui/react";

// ICONS
import { AiFillLock, AiOutlineHeart } from "react-icons/ai";
import { BsClockHistory } from "react-icons/bs";
// import { FaCubes } from "react-icons/fa";
// import { MdOutlineSpaceDashboard } from "react-icons/md";
// import { HiDesktopComputer } from "react-icons/hi";
import { ImPriceTags } from "react-icons/im";

const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const sideBarElements = [
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

  return (
    <Stack spacing={4} direction="column" p={4} w="200px">
      {sideBarElements.map((element) => (
        <Button
          key={element?.title}
          color={location?.pathname?.includes(element?.link) ? "#fff" : "#000"}
          fill={location?.pathname?.includes(element?.link) ? "#fff" : "#000"}
          colorScheme="transparent"
          justifyContent="start"
          _hover={{
            backgroundColor: "primary.500",
            color: "#fff",
            fill: "#fff",
          }}
          backgroundColor={
            location?.pathname?.includes(element?.link) && "primary.500"
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

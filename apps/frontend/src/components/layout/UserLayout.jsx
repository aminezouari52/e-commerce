// HOOKS
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// FIREBASE
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";

// COMPONENTS
import { Outlet } from "react-router-dom";
import SideBar from "@/components/nav/SideBar";
import Header from "@/components/nav/Header";
import Spinner from "@/components/Spinner";

// STYLE
import { Flex, Box } from "@chakra-ui/react";

export const UserLayout = () => {
  const user = useSelector((state) => state.userReducer.user);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) navigate("/auth/login");
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (user && user?.role !== "user") {
      navigate("/auth/login");
    }
  }, [user]);

  return isLoading ? (
    <Spinner />
  ) : (
    <Box h="100vh">
      <Header />
      <Flex h="calc(100% - 79px)">
        <Box w="200px" display={{ sm: "none", md: "block" }} bg="#fff">
          <SideBar />
        </Box>
        <Box w="100%" overflowX="hidden" bg="#e9ecef" px={6}>
          <Outlet />
        </Box>
      </Flex>
    </Box>
  );
};

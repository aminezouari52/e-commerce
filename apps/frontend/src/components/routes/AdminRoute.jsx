// HOOKS
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// FUNCTIONS
import { currentAdmin } from "../../functions/auth";

// COMPONENTS
import LoadingToRedirect from "./LoadingToRedirect";
import SideBar from "../nav/SideBar";
import { Outlet } from "react-router-dom";

// STYLE
import { Box, Flex } from "@chakra-ui/react";

const AdminRoute = () => {
  const user = useSelector((state) => state.userReducer.loggedInUser);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then(() => {
          setOk(true);
        })
        .catch(() => {
          setOk(false);
        });
    }
  }, [user]);

  return ok ? (
    <Flex h="calc(100vh - 40px)">
      <Box w="200px" display={{ sm: "none", md: "block" }}>
        <SideBar />
      </Box>
      <Box w="100%" overflowX="hidden" bg="#e9ecef">
        <Box px={5} h="100%">
          <Outlet />
        </Box>
      </Box>
    </Flex>
  ) : (
    <LoadingToRedirect />
  );
};

export default AdminRoute;

"use client";

// HOOKS
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// FIREBASE
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

// COMPONENTS
import SideBar from "../../components/nav/SideBar";
import Header from "../../components/nav/Header";
import Spinner from "../../components/Spinner";

// STYLE
import { Flex, Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useSelector((state) => state.userReducer.user);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) router.push("/auth/login");
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (user && user?.role !== "user") {
      router.push("/auth/login");
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
          {children}
        </Box>
      </Flex>
    </Box>
  );
}

// HOOKS
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// COMPONENTS
import Spinner from "@/components/Spinner";
import { Outlet } from "react-router-dom";

// STYLE
import {
  Flex,
  IconButton,
  Image,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  Text,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  Box,
} from "@chakra-ui/react";

// ASSETS
import { FaInfoCircle } from "react-icons/fa";

export const AuthLayout = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.userReducer.user);

  useEffect(() => {
    if (user && user.token) {
      if (user.role === "user") navigate("/user");
      else if (user.role === "admin") navigate("/admin");
    }
    setIsLoading(false);
  }, [user]);

  return isLoading ? (
    <Spinner />
  ) : (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      h="100vh"
      bg="white"
    >
      <Popover>
        <PopoverTrigger>
          <IconButton
            m={4}
            size="sm"
            color="primary.700"
            icon={<FaInfoCircle />}
            pos="absolute"
            top="0"
            right="58%"
          ></IconButton>
        </PopoverTrigger>
        <PopoverContent w="367px">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>
            For testing purposes you can login with these credentials
          </PopoverHeader>
          <PopoverBody>
            <Box>
              <Flex gap={1}>
                <Text fontWeight="bold">user: </Text>
                <Text>user@gmail.com</Text>
              </Flex>
              <Flex gap={1}>
                <Text fontWeight="bold">admin: </Text>
                <Text>admin@gmail.com</Text>
              </Flex>
            </Box>
          </PopoverBody>
          <PopoverFooter>
            <Flex gap={1}>
              <Text fontWeight="bold">Password: </Text>
              <Text>testtest</Text>
            </Flex>
          </PopoverFooter>
        </PopoverContent>
      </Popover>

      <Flex justifyContent="center" alignItems="center" w="50%">
        <Outlet />
      </Flex>
      <Flex h="100vh" w="70%">
        <Image
          objectFit="cover"
          src="https://images.pexels.com/photos/4458418/pexels-photo-4458418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="logo"
        />
      </Flex>
    </Flex>
  );
};

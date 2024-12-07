// HOOKS
import { useEffect, useState } from "react";

// FUNCTIONS
import { getCategories } from "../../functions/category";
import { getSubs } from "../../functions/sub";

// STYLE
import { Flex, Box, Heading, Text, Input, IconButton } from "@chakra-ui/react";

// ASSETS
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [subs, setSubs] = useState([]);
  const loadCategories = async () => {
    const response = await getCategories();
    setCategories(response?.data);
  };

  useEffect(() => {
    loadCategories();
    getSubs().then((c) => {
      setSubs(c.data);
    });
  }, []);

  return (
    <Box as="footer" w="100%" backgroundColor="black" color="white">
      <Flex
        // p={8}
        flexDirection={{ sm: "column", md: "row" }}
        alignItems={{ sm: "center", md: "flex-start" }}
        gap={{ md: "50px" }}
      >
        <Flex
          gap="10px"
          flexDirection="column"
          p={10}
          maxWidth={{ sm: "100%", md: "30%" }}
        >
          <Heading as="h5" pb={4} size="md">
            Newsletter
          </Heading>
          <Text>
            Sign up for our newsletter and receive the latest in home
            organization tips, high tech office set ups and more.
          </Text>
          <form>
            <Input
              variant="flushed"
              placeholder="Email address"
              borderColor="#292929"
              focusBorderColor="white"
            />
            <button type="submit" />
          </form>
        </Flex>
        <Flex gap={{ md: "50px", lg: "150px" }}>
          <Flex gap="10px" flexDirection="column" p={10}>
            <Heading as="h5" pb={4} size="md">
              Pages
            </Heading>
            <Text _hover={{ cursor: "pointer", opacity: "0.8" }}>Home</Text>
            <Text _hover={{ cursor: "pointer", opacity: "0.8" }}>Shop</Text>
            <Text _hover={{ cursor: "pointer", opacity: "0.8" }}> Cart</Text>
          </Flex>

          <Flex gap="10px" flexDirection="column" p={10}>
            <Heading as="h5" pb={4} size="md">
              Categories
            </Heading>
            {categories.map((category) => (
              <Text
                key={category._id}
                _hover={{ cursor: "pointer", opacity: "0.8" }}
              >
                {category.name}
              </Text>
            ))}
          </Flex>

          {/* <Flex gap="10px" flexDirection="column" p={10}>
          <Heading as="h5" pb={4} size="md">
            Sub categories
          </Heading>
          {subs.map((sub) => (
            <Text key={sub._id} _hover={{ cursor: "pointer", opacity: "0.8" }}>
              {sub.name}
            </Text>
          ))}
        </Flex> */}

          <Flex
            gap="10px"
            flexDirection="column"
            p={10}
            maxWidth={{ sm: "100%", md: "30%" }}
          >
            <Heading as="h5" pb={4} size="md">
              Company
            </Heading>
            <Text>
              Amine Building, 1st Floor, Sahloul 3, Sousse City,, Tunisia
            </Text>
            <Text>+216 25 316 325</Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        p={8}
        flexDirection={{ sm: "column-reverse", md: "row" }}
        justifyContent="space-between"
        gap="90px"
        alignItems="center"
      >
        <Text letterSpacing="2px" textTransform="uppercase" fontSize="sm">
          Copyright 2023 © NBZDEV. All rights reserved.
        </Text>
        <Flex gap="10px">
          <IconButton size="md" colorScheme="facebook" icon={<FaFacebook />} />
          <IconButton size="md" colorScheme="pink" icon={<FaInstagram />} />
          <IconButton size="md" colorScheme="twitter" icon={<FaTwitter />} />
          <IconButton size="md" colorScheme="red" icon={<FaYoutube />} />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;

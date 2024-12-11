// HOOKS
import { useTheme } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

// STYLE
import { Heading, Flex, Box, Text, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";

// ASSETS
import HeroVid from "@/images/hero-vid.mp4";

const Hero = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const videoStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  return (
    <Box flexDirection="column" justifyContent="center" position="relative">
      <Box
        h={{
          sm: `calc(100vh - ${theme.sizes.header.sm})`,
          md: `calc(100vh - ${theme.sizes.header.md})`,
          lg: `calc(100vh - ${theme.sizes.header.lg})`,
        }}
      >
        <video loop muted autoPlay={true} style={videoStyle}>
          <source src={HeroVid} type="video/mp4" />
        </video>
      </Box>
      <Flex
        position="absolute"
        top="0"
        h="100%"
        w="100%"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        padding={{ sm: 4, md: 8, lg: 10 }}
        zIndex={2}
      >
        <Heading
          textAlign="center"
          fontSize={{ sm: "3xl", md: "3xl", lg: "5xl" }}
          as="h1"
          color="white"
          py={6}
          width={{ sm: "100", md: "90%", lg: "80%" }}
        >
          Discover Something Special: Start Your Shopping Journey!
        </Heading>
        <Text
          textAlign="center"
          color="white"
          py={6}
          width="60%"
          fontSize="large"
          display={{ sm: "none", md: "block" }}
        >
          Embark on an interstellar shopping journey like no other. Our
          space-themed ecommerce platform offers a universe of products, from
          celestial gadgets to cosmic fashion.
          <br></br>
          Dive into the infinite expanse of possibilities and shop with the
          stars!
        </Text>
        <Box py={6}>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              size={{
                sm: "sm",
                md: "md",
                lg: "lg",
              }}
              marginRight={4}
              colorScheme="primary"
              color="white"
              transition="all 0.3s ease-in-out" // Transition added
              _hover={{
                background: "white",
                color: "primary.500",
              }}
              onClick={() => navigate("/shop")}
            >
              Shop now
            </Button>
          </motion.div>
        </Box>
      </Flex>
    </Box>
  );
};

export default Hero;

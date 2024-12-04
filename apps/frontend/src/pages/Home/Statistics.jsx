// STYLE
import { Heading, Flex, Box, Text, Button, Icon } from "@chakra-ui/react";

// ASSETS
import VideoSrc from "@/images/video.mp4";
import { FaTruck, FaShieldAlt } from "react-icons/fa";
import { MdDiscount } from "react-icons/md";
import { RxArrowTopRight } from "react-icons/rx";

const Statistics = () => {
  return (
    <Flex width="100vw" alignItems="center" justifyContent="space-around">
      <Flex flexDirection="column" justifyContent="center" height="100%">
        <Heading
          fontSize={{
            sm: "3xl",
            md: "4xl",
            lg: "5xl",
          }}
          as="h1"
          p={6}
        >
          Experience the Best Shopping at Our Store
        </Heading>
        <Text p={6}>
          With over a decade of excellence, we have served millions of happy
          customers worldwide.
        </Text>
        <Flex
          flexDirection={{ sm: "column", md: "row" }}
          justifyContent="space-between"
          p={6}
          rowGap="10px"
        >
          <Flex
            flexDirection="column"
            width={{ sm: "100%", md: "30%" }}
            border="1px"
            borderColor="gray.400"
            borderRadius="md"
            p={4}
            bg="white"
          >
            <Flex justifyContent="center" pb={4}>
              <Icon
                height={{ sm: "40px", lg: "50px" }}
                width="50%"
                as={MdDiscount}
                color="deepRed.500"
              ></Icon>
            </Flex>
            <Box>
              <Heading
                textAlign="center"
                fontSize={{ sm: "xl", md: "2xl", lg: "3xl" }}
              >
                50%
              </Heading>
              <Text textAlign="center" py={2}>
                Discount on All Products
              </Text>
            </Box>
          </Flex>

          <Flex
            flexDirection="column"
            width={{ sm: "100%", md: "30%" }}
            border="1px"
            borderColor="gray.400"
            borderRadius="md"
            p={4}
            bg="white"
          >
            <Flex justifyContent="center" pb={4}>
              <Icon
                height={{ sm: "40px", lg: "50px" }}
                width="50%"
                as={FaTruck}
                color="deepRed.500"
              ></Icon>
            </Flex>
            <Box>
              <Heading
                textAlign="center"
                fontSize={{ sm: "xl", md: "2xl", lg: "3xl" }}
              >
                100%
              </Heading>
              <Text textAlign="center" py={2}>
                Free shipping delivery on products over 50$
              </Text>
            </Box>
          </Flex>

          <Flex
            flexDirection="column"
            width={{ sm: "100%", md: "30%" }}
            border="1px"
            borderColor="gray.400"
            borderRadius="md"
            p={4}
            bg="white"
          >
            <Flex justifyContent="center" pb={4}>
              <Icon
                height={{ sm: "40px", lg: "50px" }}
                width="50%"
                as={FaShieldAlt}
                color="deepRed.500"
              ></Icon>
            </Flex>
            <Heading
              textAlign="center"
              fontSize={{ sm: "xl", md: "2xl", lg: "3xl" }}
            >
              +100%
            </Heading>
            <Text textAlign="center" py={2}>
              Discounts on every 10th purchase.
            </Text>
          </Flex>
        </Flex>
        <Flex justifyContent="flex-end" p={6}>
          <Button
            rightIcon={<RxArrowTopRight fontSize="24px" />}
            variant="solid"
            colorScheme="primary"
            color="#fff"
            borderColor="primary.500"
            _hover={{
              opacity: 0.8,
            }}
            size={{ sm: "sm", md: "md", lg: "lg" }}
          >
            Grab yours now
          </Button>
        </Flex>
      </Flex>

      <Flex
        display={{ sm: "none", md: "flex" }}
        justifyContent="center"
        alignItems="center"
        height="100%"
        width="50vw"
        p={20}
      >
        <Box>
          <video loop muted autoPlay={true} style={{ height: "73vh" }}>
            <source src={VideoSrc} type="video/mp4" />
          </video>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Statistics;

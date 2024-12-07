// REACT
import React, { useRef, useState, useEffect } from "react";
import { useDisclosure, useTheme } from "@chakra-ui/react";

// COMPONENTS
import ProductCard from "@/components/cards/ProductCard";

// STYLE
import {
  Box,
  Text,
  SkeletonCircle,
  SkeletonText,
  Flex,
  IconButton,
} from "@chakra-ui/react";

import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const Carousel = ({ products, loading }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [cardWidth, setCardWidth] = useState();

  const theme = useTheme();

  const handleScroll = () => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      setCanScrollLeft(container.scrollLeft > 20);
      setCanScrollRight(
        container.scrollWidth >
          container.clientWidth + container.scrollLeft + 20,
      );
    }
  };

  const scroll = (delta) => {
    if (carouselRef.current) {
      const viewportWidth = window.innerWidth;
      const cardWidthValue =
        cardWidth[viewportWidth >= theme.breakpoints.md ? "md" : "sm"];
      const scrollAmount = delta * parseInt(cardWidthValue);
      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }

    setTimeout(() => {
      handleScroll();
    }, 500);
  };

  useEffect(() => {
    setCardWidth(theme.sizes.cardWidth);

    document.addEventListener("resize", () => handleScroll());
    return () => {
      document.removeEventListener("resize", handleScroll);
    };
  }, [theme.sizes.cardWidth]);

  // Wait for the carousel to load
  const handleLoad = () => {
    handleScroll();
  };

  return (
    <>
      {products.length > 0 ? (
        <Flex
          w="100%"
          justifyContent="space-between"
          alignItems="center"
          p={{ sm: 10, md: 20, lg: 20 }}
        >
          <IconButton
            isRound={true}
            variant="solid"
            colorScheme="deepRed"
            aria-label="left scroll"
            fontSize="20px"
            icon={<ChevronLeftIcon />}
            onClick={() => scroll(-1)}
            isDisabled={!canScrollLeft}
          />

          <Flex
            ref={carouselRef}
            w="70vw"
            scrollBehavior="smooth"
            overflow="hidden"
            scrollSnapType="x mandatory"
            gap="60px"
            onLoad={handleLoad}
          >
            {products.map((product) => (
              <React.Fragment key={product._id}>
                {loading ? (
                  <Box
                    padding="6"
                    boxShadow="lg"
                    bg="white"
                    mb={2}
                    w={{
                      sm: "cardWidth.sm",
                      md: "cardWidth.md",
                      lg: "cardWidth.lg",
                    }}
                  >
                    <SkeletonCircle size="10" />
                    <SkeletonText
                      pt={4}
                      noOfLines={3}
                      spacing="4"
                      skeletonHeight="2"
                    />
                  </Box>
                ) : (
                  <ProductCard
                    product={product}
                    isOpen={isOpen}
                    onOpen={onOpen}
                    onClose={onClose}
                  />
                )}
              </React.Fragment>
            ))}
          </Flex>
          <IconButton
            isRound={true}
            variant="solid"
            colorScheme="deepRed"
            aria-label="Done"
            fontSize="20px"
            icon={<ChevronRightIcon />}
            onClick={() => scroll(1)}
            isDisabled={!canScrollRight}
          />
        </Flex>
      ) : (
        <Text fontSize="xl" p={10}>
          There are not products currently
        </Text>
      )}
    </>
  );
};

export default Carousel;

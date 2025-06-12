"use client";

// HOOKS
import { useState, useEffect } from "react";

// FUNCTIONS
import { getCategories } from "../functions/category";

// COMPONENTS
import { Gallery } from "react-grid-gallery";
import { useRouter } from "next/navigation";

// STYLE
import { Box, Heading, Text } from "@chakra-ui/react";

const CategoryList = () => {
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  const loadImages = async () => {
    let images = [];
    const response = await getCategories();
    setCategories(response.data);

    response.data?.map((category, index) => {
      images.push({
        src: category.image,
        thumbnailCaption: (
          <Heading
            color="#000"
            p={2}
            as="h1"
            pos="absolute"
            bottom={index % 2 === 0 ? "0" : undefined}
            top={index % 2 !== 0 ? "0" : undefined}
            cursor="pointer"
            fontWeight="normal"
            pointerEvents="none"
          >
            {category.name}
          </Heading>
        ),
      });
    });
    setImages(images);
  };

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <Box my={2}>
      <Heading
        display="flex"
        fontSize={{
          sm: "xl",
          md: "2xl",
          lg: "3xl",
        }}
        as="h1"
        py={{ sm: 8, md: 10, lg: 12 }}
        justifyContent="center"
      >
        <Text color="deepRed.500"> Explore </Text>
        &nbsp; our categories
      </Heading>
      {/* <Gallery
        onClick={(index) =>
          router.push(`/category/${categories[index]?.slug}/`)
        }
        rowHeight={500}
        enableImageSelection={false}
        images={images}
      /> */}
    </Box>
  );
};

export default CategoryList;

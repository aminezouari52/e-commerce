"use client";

import { useState } from "react";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Box,
  Avatar,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";

const FileUpload = ({ values, setValues }) => {
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.userReducer.user);

  const fileUploadAndResize = (e) => {
    let files = e.target.files; // 3
    console.log(files);
    let allUploadedFiles = values.images;
    setValues({ ...values, images: files });
    // resize
    if (files) {
      setIsLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          async (uri) => {
            try {
              const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_V1_URL}/cloudinary/uploadimages`,
                { image: uri },
                { headers: { authtoken: user ? user.token : "" } },
              );
              setIsLoading(false);
              allUploadedFiles.push(res.data);
              console.log(allUploadedFiles);

              setValues({ ...values, images: allUploadedFiles });
            } catch (err) {
              console.log(err);

              setIsLoading(false);
            }
          },
          "base64",
        );
      }
    }
  };

  const handleImageRemove = async (public_id) => {
    setIsLoading(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_V1_URL}/cloudinary/removeimage`,
        { public_id },
        {
          headers: {
            authtoken: user ? user.token : "",
          },
        },
      );

      setIsLoading(false);
      const { images } = values;
      let filteredImages = images.filter((item) => {
        return item.public_id !== public_id;
      });
      setValues({ ...values, images: filteredImages });
    } catch (err) {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Flex my={2}>
        {values &&
          Array.isArray(values?.images) &&
          values?.images?.map((image) => (
            <Box key={image.public_id} position="relative" mr={2}>
              <Avatar src={image.url} borderRadius="0px" size="xl" />
              <SmallCloseIcon
                position="absolute"
                top={-1}
                right={-1}
                boxSize={5}
                bg="red"
                color="white"
                borderRadius="50%"
                cursor="pointer"
                onClick={() => handleImageRemove(image.public_id)}
              />
            </Box>
          ))}
      </Flex>

      <FormControl>
        {isLoading ? (
          <Spinner color="primary.500" />
        ) : (
          <FormLabel
            w="140px"
            bg="gray.200"
            color="primary.500"
            fontWeight="bold"
            cursor="pointer"
            borderRadius="4px"
            _hover={{ opacity: "0.7" }}
            py={2}
            px={4}
          >
            Choose image
            <Input
              focusBorderColor="primary.500"
              type="file"
              multiple
              accept="images/*"
              onChange={fileUploadAndResize}
              display="none"
            />
          </FormLabel>
        )}
      </FormControl>
    </>
  );
};

export default FileUpload;

"use client";

import { Flex, Image, Heading, Button } from "@chakra-ui/react";
import Link from "next/link";

const NotFound = () => {
  return (
    <Flex
      bg="#fff"
      h="100vh"
      direction="column"
      alignItems="center"
      justifyContent="center"
      gap={10}
    >
      <Image boxSize="400px" src="/not-found.svg" alt="Dan Abramov" />
      <Heading size="md" textAlign="center">
        Sorry! The page you are looking for could not be found.
      </Heading>
      <Button as={Link} href="/" colorScheme="deepRed" variant="link">
        Return to the home page
      </Button>
    </Flex>
  );
};

export default NotFound;

"use client";

import { useRouter } from "next/navigation";
import { Image } from "@chakra-ui/react";

const Logo = (props) => {
  const router = useRouter();
  return (
    <Image
      objectFit="cover"
      src="/logo.png"
      alt="logo"
      h="auto"
      w="180px"
      cursor="pointer"
      _hover={{
        opacity: 0.8,
      }}
      onClick={() => router.push("/")}
      {...props}
    />
  );
};
export default Logo;

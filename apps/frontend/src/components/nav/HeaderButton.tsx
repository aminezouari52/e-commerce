"use client";

// HOOKS
import { useState } from "react";
import { usePathname } from "next/navigation";

// STYLE
import { Button, Box } from "@chakra-ui/react";
import Link from "next/link";

const HeaderButton = ({ pathname, children }) => {
  const nextPathname = usePathname();
  const [isHovering, setIsHovering] = useState(false);

  const color = () => {
    return nextPathname === pathname || isHovering ? "primary.500" : "#000";
  };

  return (
    <Button
      as={Link}
      href={pathname}
      variant="transparent-with-icon"
      size="lg"
      display={{ sm: "none", md: "flex", lg: "flex" }}
      h="100%"
      color={color}
      style={{
        fill: color,
        transition: "all ease-in-out 0.2s",
      }}
      letterSpacing="2px"
      onMouseEnter={() => {
        setIsHovering(true);
      }}
      onMouseLeave={() => setIsHovering(false)}
      textTransform="uppercase"
      py={0}
      px={2}
      fontWeight="bold"
    >
      {children}
      <Box
        position="absolute"
        left="0"
        bottom="0"
        width={nextPathname === pathname || isHovering ? "100%" : "0"}
        height="3px"
        borderRadius="2px"
        backgroundColor="primary.500"
        transition="width 0.3s ease-in-out"
      />
    </Button>
  );
};

export default HeaderButton;

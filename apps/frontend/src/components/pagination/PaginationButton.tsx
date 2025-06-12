"use client";

import { Button } from "@chakra-ui/react";

const activeStyle = {
  bg: "primary.500",
  color: "white",
};

interface PaginationButtonProps {
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

const PaginationButton = (props: PaginationButtonProps) => {
  return (
    <Button
      size="xs"
      bg={!props.active ? "white" : "primary.500"}
      color={!props.active ? "gray.700" : "white"}
      borderRadius={4}
      isDisabled={props.disabled}
      opacity={props.disabled ? 0.6 : undefined}
      _hover={!props.disabled ? activeStyle : undefined}
      cursor={props.disabled ? "not-allowed" : undefined}
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  );
};

export default PaginationButton;

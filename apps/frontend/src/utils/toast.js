import { useToast as useChakraToast } from "@chakra-ui/react";

export const useToast = () => {
  const toast = useChakraToast();

  return (title, status) => {
    toast({
      title,
      status,
      duration: 3000,
      isClosable: true,
    });
  };
};

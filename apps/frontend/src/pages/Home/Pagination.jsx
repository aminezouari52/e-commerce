import { Box, Flex, Button } from "@chakra-ui/react";

const Pagination = ({ productsPerPage, totalProducts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Box my={2}>
      <Flex>
        {pageNumbers.map((number) => (
          <Button
            key={number}
            onClick={() => paginate(number)}
            variant="outline"
            size="sm"
            mx={2}
            color="primary.500"
            borderColor="primary.500"
            backgroundColor="#fff"
            _hover={{
              backgroundColor: "silver.500",
            }}
          >
            {number}
          </Button>
        ))}
      </Flex>
    </Box>
  );
};

export default Pagination;

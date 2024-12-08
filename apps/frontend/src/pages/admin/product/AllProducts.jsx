// REACT
import { useState, useEffect, useRef } from "react";
import {
  useToast,
  useDisclosure,
  Image,
  Button,
  Icon,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import laptop from "../../../images/laptop.jpg";
import { useNavigate } from "react-router-dom";

// REDUX
import { useSelector } from "react-redux";

// FUNCTIONS
import { getProductsByCount, removeProduct } from "../../../functions/product";

// STYLE
import { Flex, Box, Heading, Center, Spinner, Text } from "@chakra-ui/react";
import DataTableDisplay from "../../../components/dataDisplay/DataTable";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

const AllProducts = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const cancelRef = useRef();
  const productColumns = [
    {
      name: "Title",
      selector: (row) => {
        return (
          <Flex justifyContent="start">
            <Center>
              <Image
                src={
                  row?.images && row?.images.length > 0
                    ? row?.images[0]?.url
                      ? row?.images[0]?.url
                      : `${import.meta.env.VITE_REACT_APP_API}` + row?.images[0]
                    : laptop
                }
                alt="product image"
                borderRadius="full"
                boxSize="35px"
                h="35px"
              />
              <h1>{row?.title}</h1>
            </Center>
          </Flex>
        );
      },
    },
    {
      name: "Description",
      selector: (row) => {
        return (
          <Text fontSize="sm">
            {row?.description.length > 20
              ? `${row?.description.substring(0, 20)}...`
              : row?.description}
          </Text>
        );
      },
    },
    {
      name: "Price",
      selector: (row) => {
        return (
          <Text fontSize={{ sm: "sm", md: "md", lg: "lg" }}>{row.price}$</Text>
        );
      },
    },
    {
      name: "Actions",
      selector: (row) => {
        return (
          <Flex justifyContent="space-evenly" w="100%">
            <Button
              size="sm"
              variant="solid"
              colorScheme="yellow"
              onClick={() => {
                navigate(`/admin/products/${row?.slug}`);
              }}
            >
              <Icon as={AiFillEdit} />
            </Button>

            <Button
              size="sm"
              variant="solid"
              colorScheme="red"
              onClick={() => {
                onOpen();
                setSelectedId(row?.slug);
              }}
            >
              <Icon as={AiFillDelete} />
            </Button>
          </Flex>
        );
      },
    },
  ];
  const user = useSelector((state) => state.userReducer.loggedInUser);

  // DELETE DIALOG
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = async () => {
    try {
      setLoading(true);
      const res = await getProductsByCount(100);
      console.log(res);

      setProducts(res.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    if (selectedId && selectedId !== null) {
      setLoading(true);
      try {
        await removeProduct(selectedId, user.token);
        setLoading(false);
        toast({
          title: "Product deleted",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        loadAllProducts();
        setSelectedId();
      } catch (err) {
        setLoading(false);
        setSelectedId();
        toast({
          title: "Failed to delete product",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      onClose();
    }
  };

  return (
    <>
      {loading && (
        <Center
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="rgba(0, 0, 0, 0.2)"
        >
          <Spinner size="xl" color="primary.500" />
        </Center>
      )}

      <Box overflowY="hidden">
        <Flex justify={"space-between"} align={"center"}>
          <Heading size="lg" color="primary.500" my={5}>
            All products
          </Heading>
          <Button
            type="submit"
            size="sm"
            colorScheme="primary"
            onClick={() => navigate("/admin/products/create")}
          >
            Create product
          </Button>
        </Flex>
        <DataTableDisplay columns={productColumns} data={products} />
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay bgColor="rgba(0, 0, 0, 0.2)">
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Product
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={() => handleRemove()} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Box>
    </>
  );
};
export default AllProducts;

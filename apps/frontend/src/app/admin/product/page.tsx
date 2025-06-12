"use client";

// HOOKS
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useToast } from "../../../utils/toast";
import { useDisclosure } from "@chakra-ui/react";

// COMPONENTS
import DataTableDisplay from "../../../components/dataDisplay/DataTable";

// FUNCTIONS
import { getProductsByCount, removeProduct } from "../../../functions/product";

// STYLE
import {
  Flex,
  Box,
  Heading,
  Center,
  Spinner,
  Text,
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

// ASSETS
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import Link from "next/link";

const AllProducts = () => {
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
                      : `${process.env.NEXT_PUBLIC_REACT_APP_API}` +
                        row?.images[0]
                    : "/laptop.jpg"
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
              as={Link}
              href={`/admin/products/${row?.slug}`}
              size="sm"
              variant="solid"
              colorScheme="yellow"
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
  const user = useSelector((state) => state.userReducer.user);

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
        toast("Product deleted", "error");
        loadAllProducts();
        setSelectedId();
      } catch (err) {
        setLoading(false);
        setSelectedId();
        toast("Failed to delete product", "error");
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
            as={Link}
            href="/admin/products/create"
            type="submit"
            size="sm"
            colorScheme="primary"
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

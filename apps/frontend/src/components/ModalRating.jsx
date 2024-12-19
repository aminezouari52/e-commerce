import { useRef } from "react";
import { useSelector } from "react-redux";
import { useDisclosure } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import StarRating from "react-star-ratings";
import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  useToast,
  Flex,
  Text,
  Tooltip,
} from "@chakra-ui/react";

const ModalRating = ({ product, children }) => {
  const navigate = useNavigate();
  const cancelRef = useRef();
  const { slug } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useSelector((state) => state.userReducer.user);
  const toast = useToast();

  const onOpenHandler = () => {
    return user && user.token
      ? onOpen()
      : navigate(`/auth/login`, { state: { from: `/product/${slug}` } });
  };

  const okHandler = () => {
    onClose();
    toast({
      title: "Thanks for your review. It will apper soon",
      status: "success",
      colorScheme: "green",
      duration: 3000,
      isClosable: true,
    });
  };

  let result = 0;
  if (product && product.ratings && product.ratings.length !== 0) {
    let ratingsArray = product && product.ratings;
    let total = [];
    let length = ratingsArray.length;
    ratingsArray.map((r) => total.push(r.star));
    let totalReduced = total.reduce((p, n) => p + n, 0);
    let highest = length * 5;
    result = (totalReduced * 5) / highest;
  }

  return (
    <>
      <Tooltip
        label={user ? "Leave rating" : "Login to leave rating"}
        placement="top"
        hasArrow
      >
        <Flex
          cursor="pointer"
          gap={1}
          justifyContent="center"
          alignItems="center"
          onClick={onOpenHandler}
          _hover={{
            opacity: 0.8,
          }}
        >
          <StarRating
            starDimension="20px"
            starSpacing="2px"
            starRatedColor="red"
            rating={result}
            editing={false}
          />
          <Text>
            ({product?.ratings?.length > 0 ? product?.ratings?.length : 0})
          </Text>
        </Flex>
      </Tooltip>

      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Leave your rating</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{children}</AlertDialogBody>
          <AlertDialogFooter>
            <Button
              colorScheme="primary"
              ml={3}
              onClick={okHandler}
              _hover={{
                opacity: 0.8,
              }}
            >
              Done
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ModalRating;

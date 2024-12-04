import { useNavigate } from "react-router-dom";
import {
  Text,
  Button,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Flex,
} from "@chakra-ui/react";

const PlaceOrderModal = ({ isOpen, onClose, succeeded, total, placeOrder }) => {
  const navigate = useNavigate();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {succeeded ? "Order submitted successfully!" : "Place order"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {succeeded ? (
            <>
              <Text>
                Your order was submitted successfully! we will email you the
                delivery date soon.
              </Text>

              <Button
                variant="link"
                colorScheme="deepBlue"
                onClick={() => navigate("/user/history")}
              >
                See it in your purchase history.
              </Button>
            </>
          ) : (
            <>
              <Text>Are you sure you want to confirm your order?</Text>
              <Text>
                Total: <b>{total.toFixed(2)}$</b>
              </Text>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Flex gap={4}>
            <Button
              variant="ghost"
              color="deepRed.500"
              onClick={onClose}
              _hover={{
                opacity: 0.8,
              }}
            >
              {succeeded ? "Close" : "Cancel"}
            </Button>
            {!succeeded && (
              <Button
                type="submit"
                onClick={placeOrder}
                bg="gold.500"
                color="#000"
                mr={3}
                _hover={{
                  opacity: 0.8,
                }}
              >
                Confirm order
              </Button>
            )}
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default PlaceOrderModal;

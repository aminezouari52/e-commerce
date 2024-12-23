// HOOKS
import { useDispatch } from "react-redux";
import useToast from "@/utils/toast";

import { setCart } from "@/reducers/cartReducer";

// STYLE1
import { Tr, Td, Image, Input, Button, Icon, Flex } from "@chakra-ui/react";

// ASSETS
import { CheckCircleIcon } from "@chakra-ui/icons";
import laptop from "@/assets/laptop.jpg";
import { AiFillCloseCircle, AiFillDelete } from "react-icons/ai";

const ProductCardInCheckout = ({ p }) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const handleQuantityChange = (e) => {
    let count = e.target.value < 1 ? 1 : e.target.value;

    if (count > p.quantity) {
      toast(`Max available quantity: ${p.quantity}`, "error");
      return;
    }

    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.forEach((product, i) => {
        if (product._id === p._id) {
          cart[i].count = count;
        }
      });
      dispatch(setCart(cart));
    }
  };

  const handleRemove = () => {
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // [1,2,3,4,5]
      cart.forEach((product, i) => {
        if (product._id === p._id) {
          cart.splice(i, 1);
        }
      });
      dispatch(setCart(cart));
    }
  };

  return (
    <Tr>
      <Td>
        <Image
          src={p.images && p.images.length ? p.images[0].url : laptop}
          h="auto"
          w="100px"
          maxWidth="180px"
        />
      </Td>
      <Td style={{ whiteSpace: "normal", wordWrap: "break-word" }}>
        {p.title}
      </Td>
      <Td>${p.price}</Td>
      <Td>{p.brand}</Td>
      <Td>{p.color}</Td>
      <Td maxWidth="100px">
        <Input
          focusBorderColor="primary.500"
          type="number"
          minWidth="70px"
          maxWidth="100px"
          value={p.count}
          onChange={handleQuantityChange}
        />
      </Td>
      <Td>
        <Flex justifyContent="center" alignItems="center">
          {p.shipping === "Yes" ? (
            <CheckCircleIcon color="green" />
          ) : (
            <Icon
              height="30px"
              width="30%"
              as={AiFillCloseCircle}
              color="red"
            />
          )}
        </Flex>
      </Td>
      <Td>
        <Flex justifyContent="center" alignItems="center">
          <Button
            size="xs"
            variant="ghost"
            colorScheme="red"
            onClick={handleRemove}
          >
            <Icon as={AiFillDelete} h="20px" w="20px" />
          </Button>
        </Flex>
      </Td>
    </Tr>
  );
};

export default ProductCardInCheckout;

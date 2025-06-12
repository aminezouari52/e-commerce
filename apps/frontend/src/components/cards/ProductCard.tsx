"use client";

// HOOKS
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/utils/toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

// FUNCTIONS
import { addGuestProduct, addUserProduct } from "@/reducers/cartReducer";
import ShowRating from "@/components/ShowRating";
import _ from "lodash";

// STYLE
import {
  Flex,
  Image,
  Heading,
  Text,
  Button,
  Icon,
  CloseButton,
  Tooltip,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

// ASSETS
import { IoCart } from "react-icons/io5";

const ProductCard = ({ product, onCloseHandler }) => {
  const user = useSelector((state) => state.userReducer.user);
  const { images, title, slug, price } = product;
  const dispatch = useDispatch();
  const toast = useToast();
  const router = useRouter();

  const handleAddProduct = async () => {
    if (user && user.token) {
      dispatch(addUserProduct({ product, count: 1 }));
      toast("Product added.", "success");
    } else {
      dispatch(addGuestProduct({ product, count: 1 }));
      toast("Product added.", "success");
    }
  };

  return (
    <Flex
      position="relative"
      bg="white"
      w={{ sm: "cardWidth.sm", md: "cardWidth.md", lg: "cardWidth.lg" }}
      minWidth={{ sm: "cardWidth.sm", md: "cardWidth.md", lg: "cardWidth.lg" }}
      flexDirection="column"
      justifyContent="space-between"
      gap="15px"
      boxShadow="1px 0px 8px 2px rgba(0,0,0,0.2)"
      scrollSnapAlign="center"
      m={10}
    >
      <Flex
        as={Link}
        href={`/product/${slug}`}
        cursor="pointer"
        onClick={() => router.push(`/product/${slug}`)}
        position="relative"
      >
        <motion.div
          whileHover={{
            y: -30,
          }}
          style={{
            zIndex: 1,
          }}
        >
          <Image
            src={images?.length ? images[0].url : "/laptop.jpg"}
            h={{ sm: "140px", md: "180px", lg: "200px" }}
            w={{ sm: "cardWidth.sm", md: "cardWidth.md", lg: "cardWidth.lg" }}
          />
        </motion.div>
        <Flex
          position="absolute"
          bottom="0"
          justifyContent="center"
          w="100%"
          zIndex="0"
        >
          <ShowRating product={product} />
        </Flex>
      </Flex>
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="5px"
      >
        <Heading fontSize={{ sm: "sm", md: "md", lg: "lg" }}>{title}</Heading>
        <Text fontSize={{ sm: "sm", md: "md", lg: "lg" }}>{price}$</Text>
      </Flex>
      <Button
        w="100%"
        size={{ sm: "xs", md: "sm", lg: "md" }}
        variant="solid"
        borderRadius="0px"
        colorScheme="primary"
        isDisabled={product?.quantity < 1}
        leftIcon={<Icon as={IoCart} />}
        onClick={handleAddProduct}
        _hover={{
          opacity: !(product?.quantity < 1) && 0.8,
        }}
      >
        {product?.quantity < 1 ? "Out of stock" : "Add to cart"}
      </Button>
      {onCloseHandler && (
        <Tooltip label={"remove from wishlist"} placement="top" hasArrow>
          <CloseButton
            size="sm"
            zIndex="4"
            position="absolute"
            top="-12px"
            right="-12px"
            color="red"
            variant="solid"
            bg="#fff"
            borderRadius="50%"
            _hover={{
              opacity: 0.8,
            }}
            onClick={onCloseHandler}
          />
        </Tooltip>
      )}
    </Flex>
  );
};
export default ProductCard;

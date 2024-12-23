// HOOKS
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useToast from "@/utils/toast";

// FUNCTIONS
import { addProduct } from "@/reducers/cartReducer";
import ShowRating from "@/components/ShowRating";
import _ from "lodash";

// STYLE
import { Flex, Image, Heading, Text, Button, Icon } from "@chakra-ui/react";
import { motion } from "framer-motion";

// ASSETS
import laptop from "@/assets/laptop.jpg";
import { IoCart } from "react-icons/io5";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { images, title, slug, price } = product;
  const dispatch = useDispatch();
  const toast = useToast();

  const handleAddToCart = () => {
    dispatch(addProduct(product));
    toast("Product added.", "info");
  };

  return (
    <Flex
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
        cursor="pointer"
        onClick={() => navigate(`/product/${slug}`)}
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
            src={images?.length ? images[0].url : laptop}
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
          {/* {product && product?.ratings && product?.ratings?.length > 0 ? ( */}
          <ShowRating product={product} />
          {/* ) : ( */}
          {/* <Text textAlign="center" fontWeight="bold"> */}
          {/* No rating yet */}
          {/* </Text> */}
          {/* )} */}
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
        onClick={handleAddToCart}
        _hover={{
          opacity: !(product?.quantity < 1) && 0.8,
        }}
      >
        {product?.quantity < 1 ? "Out of stock" : "Add to cart"}
      </Button>
    </Flex>
  );
};
export default ProductCard;

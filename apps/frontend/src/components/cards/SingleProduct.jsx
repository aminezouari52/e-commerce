// PACKAGES
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import StarRating from "react-star-ratings";

// HOOKS
import { useDispatch, useSelector } from "react-redux";

// FUNCTIONS
import { showAverage } from "@/functions/rating";
import { addToWishlist } from "@/functions/user";
import { addProduct } from "@/reducers/cartReducer";
import _ from "lodash";

// COMPONENTS
import ProductListItems from "./ProductListItems";
import RatingModal from "../RatingModal";

// STYLE
import {
  Box,
  Flex,
  Stack,
  Heading,
  ButtonGroup,
  Button,
  Icon,
  useToast,
  Text,
} from "@chakra-ui/react";

// ASSETS
import noImg from "@/assets/no-image-available.jpg";
import { AiOutlineHeart } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";

const SingleProduct = ({ product, star, onStarClick }) => {
  const { title, images, _id } = product;
  const user = useSelector((state) => state.userReducer.loggedInUser);
  const dispatch = useDispatch();
  const toast = useToast();

  const handleAddToCart = () => {
    dispatch(addProduct(product));
    toast({
      title: "Product added to cart.",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    addToWishlist(product?._id, user.token).then(() => {
      toast({
        title: "Product added to wishlist.",
        status: "info",
        colorScheme: "green",
        duration: 2000,
        isClosable: true,
      });
    });
  };

  return (
    <Flex direction={{ sm: "column", md: "row" }}>
      <Flex
        alignItems="center"
        justifyContent="center"
        w={{ sm: "100%", md: "50%" }}
        p={4}
      >
        {images?.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images?.map((image, index) => (
              <Box key={index}>
                <img src={image.url} alt="slider img" className="slider-img" />
              </Box>
            ))}
          </Carousel>
        ) : (
          <img src={noImg} alt="no-img" className="no-img" />
        )}
      </Flex>

      <Stack w={{ sm: "100%", md: "50%" }} bg="#fff">
        <Heading
          size="md"
          py={4}
          px={2}
          backgroundColor="primary.500"
          color="#fff"
        >
          {title}
        </Heading>
        {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <Text textAlign="center" fontWeight="bold" p="2">
            No rating yet
          </Text>
        )}
        <ProductListItems product={product} />
        <Box p={4}>
          <ButtonGroup
            display="flex"
            w="100%"
            flexDirection={{ sm: "column", md: "row" }}
            isAttached={{ sm: "false", md: "true" }}
          >
            <Button
              variant="ghost"
              colorScheme="green"
              leftIcon={<Icon as={AiOutlineHeart} />}
              onClick={handleAddToWishlist}
              isDisabled={product?.quantity < 1}
              w="100%"
            >
              Add to wishlist
            </Button>

            <RatingModal>
              <StarRating
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={onStarClick}
                isSelectable={true}
                starRatedColor="red"
              />
            </RatingModal>
            <Button
              variant="solid"
              color="#fff"
              borderColor="primary.500"
              _hover={{
                opacity: 0.8,
              }}
              colorScheme="primary"
              leftIcon={<Icon as={AiOutlineShoppingCart} />}
              onClick={handleAddToCart}
              isDisabled={product?.quantity < 1}
              w="100%"
            >
              {product?.quantity < 1 ? "Out of stock" : "Add to cart"}
            </Button>
          </ButtonGroup>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SingleProduct;

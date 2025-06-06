// PACKAGES
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import StarRating from "react-star-ratings";

// HOOKS
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/utils/toast";

// FUNCTIONS
import { addToWishlist } from "@/functions/user";
import { addGuestProduct, addUserProduct } from "@/reducers/cartReducer";
import _ from "lodash";

// COMPONENTS
import CharacteristicsProduct from "./CharacteristicsProduct";
import ModalRating from "@/components/ModalRating";

// STYLE
import {
  Box,
  Flex,
  Stack,
  Heading,
  ButtonGroup,
  Button,
  Icon,
  Text,
  IconButton,
} from "@chakra-ui/react";

// ASSETS
import noImg from "@/assets/no-image-available.jpg";
import { AiOutlineHeart } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiTruck } from "react-icons/fi";

const SingleProduct = ({ product, star, onStarClick }) => {
  const { title, images, _id } = product;
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();
  const toast = useToast();

  const handleAddProduct = async () => {
    const payload = { product, count: 1 };
    if (user && user.token) dispatch(addUserProduct(payload));
    else dispatch(addGuestProduct(payload));
    toast("Product added.", "success");
  };

  const handleAddToWishlist = async (event) => {
    event.preventDefault();
    if (!user) {
      toast("login to proceed", "info");
      return;
    }
    await addToWishlist(product?._id, user.token);
    toast("Product added to wishlist.", "success");
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

      <Stack w={{ sm: "100%", md: "50%" }} bg="#fff" py={6} px={6} spacing={4}>
        <Heading size="lg">{title}</Heading>

        <ModalRating product={product}>
          <StarRating
            name={_id}
            numberOfStars={5}
            rating={star}
            changeRating={onStarClick}
            isSelectable={true}
            starRatedColor="red"
          />
        </ModalRating>

        <Text fontWeight="bold" fontSize="4xl">
          ${product?.price}.00
        </Text>

        <Text>{product?.description}</Text>

        <CharacteristicsProduct product={product} />

        <Flex direction="column" gap={2}>
          <ButtonGroup
            display="flex"
            w="100%"
            flexDirection={{ sm: "column", md: "row" }}
          >
            <Button
              variant="solid"
              color="#fff"
              borderColor="primary.500"
              _hover={{
                opacity: 0.8,
              }}
              colorScheme="primary"
              leftIcon={<Icon as={AiOutlineShoppingCart} />}
              onClick={handleAddProduct}
              isDisabled={product?.quantity < 1}
              w="100%"
            >
              {product?.quantity < 1 ? "Out of stock" : "Add to cart"}
            </Button>
            <IconButton
              icon={<AiOutlineHeart />}
              variant="outline"
              borderColor="primary.500"
              onClick={handleAddToWishlist}
              isDisabled={product?.quantity < 1}
            >
              Add to wishlist
            </IconButton>
          </ButtonGroup>
          <Flex alignItems="center" gap={2}>
            <Icon as={FiTruck} />
            <Text fontSize="sm">free dilevery from orders above 350$</Text>
          </Flex>
        </Flex>
      </Stack>
    </Flex>
  );
};

export default SingleProduct;

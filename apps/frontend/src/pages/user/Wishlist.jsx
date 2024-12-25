// HOOKS
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// COMPONENTS
import ProductCard from "@/components/cards/ProductCard";

// FUNCTIONS
import { getUserWishlist, removeWishlist } from "@/functions/user";

// STYLE
import { Text, Box, Heading, SimpleGrid } from "@chakra-ui/react";

const Wishlist = () => {
  const user = useSelector((state) => state.userReducer.user);
  const [wishlist, setWishlist] = useState([]);

  const loadWishlist = async () => {
    const response = await getUserWishlist(user?.token);
    setWishlist(response.data.wishlist);
  };

  const handleRemove = async (productId) => {
    if (user) {
      await removeWishlist(productId, user.token);
      loadWishlist();
    }
  };

  useEffect(() => {
    if (user) {
      loadWishlist();
    }
  }, [user]);

  return (
    <Box overflowY="hidden">
      <Heading size="lg" color="primary.500" my={5}>
        Wishlist
      </Heading>
      {wishlist?.length > 0 ? (
        <>
          <SimpleGrid
            minChildWidth={{
              sm: "cardWidth.sm",
              md: "cardWidth.md",
              lg: "cardWidth.lg",
            }}
            spacing={10}
          >
            {wishlist?.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onCloseHandler={() => handleRemove(product._id)}
              />
            ))}
          </SimpleGrid>
        </>
      ) : (
        <Text>Wish list is empty.</Text>
      )}
    </Box>
  );
};

export default Wishlist;

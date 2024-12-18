import StarRating from "react-star-ratings";
import { Flex, Text } from "@chakra-ui/react";

const ShowRating = ({ product }) => {
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
    <Flex gap={1} justifyContent="center" alignItems="center">
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
  );
};

export default ShowRating;

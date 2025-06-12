import ProductSlug from "./_components/ProductSlug";

const SingleProduct = ({ product, star, onStarClick }) => {
  return (
    <ProductSlug product={product} star={star} onStarClick={onStarClick} />
  );
};

export default SingleProduct;

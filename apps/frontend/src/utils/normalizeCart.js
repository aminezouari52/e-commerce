export const normalizeCart = (cart) => {
  return (
    cart?.products?.map((p) => {
      return {
        count: p.count,
        ...p.product,
      };
    }) || []
  );
};

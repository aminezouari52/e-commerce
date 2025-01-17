export const convertTocartReducer = (cart) => {
  return (
    cart?.products?.map((p) => {
      return {
        count: p.count,
        ...p.product,
      };
    }) || []
  );
};

import SingleProduct from "../_components/SingleProduct";
import { getProducts } from "@/functions/product";

interface Props {
  params: { productSlug: string };
}

export default async function Product({ params }: Props) {
  const { productSlug } = await params;
  return <SingleProduct slug={productSlug} />;
}

export async function generateStaticParams() {
  const response = await getProducts();
  const products = response.data;

  return products.map((product: { slug: string }) => ({
    slug: product.slug,
  }));
}

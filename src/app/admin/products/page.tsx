import ProductsForm from "./ProductsForm";
import { getProducts } from "../../actions";

export const dynamic = 'force-dynamic';

export default async function ProductsAdminPage() {
  const products = await getProducts();
  return <ProductsForm initialProducts={products} />;
}

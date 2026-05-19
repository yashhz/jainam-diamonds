import ClientPage from "./ClientPage";
import { getConfig, getProducts } from "./actions";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const config = await getConfig();
  const products = await getProducts();
  return <ClientPage config={config} products={products} />;
}

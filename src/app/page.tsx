import { products } from "../lib/products/data";
import { MainSection } from "./components/ui/mainsection";

export default async function Home() {
  const productList = await getAvailableProducts();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen py-8 md:p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 ">
        <MainSection productList={productList} />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}

async function getAvailableProducts() {
  if (!products) return [];
  return products;
}

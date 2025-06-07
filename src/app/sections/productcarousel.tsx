"use client";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import ProductCard from "../components/ui/productcard";
import { Product } from "../../lib/products/product";
import { ButtonLeft } from "@/components/ui/button-left";
import { ButtonRight } from "@/components/ui/button-right";
import { useGetTimeslots } from "../../queries/timeslots/useGetTimeslots";
import { Loader } from "lucide-react";

interface ProductCarouselProps {
  productList: Product[];
  submittedProductIds: number[];
  setSubmittedProductIds: Dispatch<SetStateAction<number[]>>;
}

export function ProductCarousel({
  productList,
  submittedProductIds,
  setSubmittedProductIds,
}: ProductCarouselProps) {
  const container = useRef<HTMLDivElement>(null);
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]); // if I wanted no submit button I would just use this to trigger query
  const { isLoading, isError } = useGetTimeslots(submittedProductIds);

  function handleChange(productId: number, isChecked: boolean) {
    setSelectedProductIds((prev) =>
      isChecked ? [...prev, productId] : prev.filter((id) => id !== productId)
    );
  }

  function handleSubmit() {
    setSubmittedProductIds(selectedProductIds);
  }

  function scrollHandler(value: number) {
    container.current?.scrollBy({
      left: value,
      top: 0,
      behavior: "smooth",
    });
  }
  if (!productList) return <p>No products are available.</p>;

  if (isError) {
    return (
      <p className="text-sm text-red-900">
        Cannot check timeslots right now. Please try again later.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-5 ">
      <div className="flex">
        <div className="w-full">
          <h2 className="text-3xl font-bold">Product Catalogue</h2>
          <p className="text-neutral-600">
            Choose what you want, skip what you don&apos;t.
          </p>
        </div>
        {productList && productList.length > 0 && (
          <div className="hidden md:flex w-full justify-end items-center mb-5 gap-2">
            <ButtonLeft
              onClick={() => {
                scrollHandler(-300);
              }}
              width={40}
            />
            <ButtonRight
              onClick={() => {
                scrollHandler(300);
              }}
              width={40}
            />
          </div>
        )}
      </div>
      <div
        ref={container}
        className="flex gap-5 max-w-[400px] md:max-w-7xl overflow-x-scroll no-scrollbar"
      >
        {productList.map((product: Product) => (
          <ProductCard
            key={product.id}
            product={product}
            onChange={handleChange}
            isChecked={selectedProductIds.includes(product.id)}
          />
        ))}
      </div>

      <div className=" w-full flex justify-end mt-5">
        <button
          onClick={() => handleSubmit()}
          className="bg-neutral-800 w-40 text-sm  rounded-2xl p-3 hover:cursor-pointer hover:bg-neutral-600 duration-150"
        >
          <div className="flex justify-center">
            {isLoading ? (
              <Loader className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <p>Check Timeslots</p>
            )}
          </div>
        </button>
      </div>
    </div>
  );
}

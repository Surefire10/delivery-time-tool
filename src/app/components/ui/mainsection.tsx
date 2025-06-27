"use client";
import { useState } from "react";
import { Product } from "../../../core/entities/models/product";
import { ProductCarousel } from "@/sections/productcarousel";
import { TimeSlots } from "@/sections/datetimeslots";

export function MainSection({ productList }: { productList: Product[] }) {
  const [submittedProductIds, setSubmittedProductIds] = useState<number[]>([]);

  return (
    <div className="flex flex-col gap-15">
      <ProductCarousel
        productList={productList}
        submittedProductIds={submittedProductIds}
        setSubmittedProductIds={setSubmittedProductIds}
      />
      <TimeSlots submittedProductIds={submittedProductIds} />
    </div>
  );
}

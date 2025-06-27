import { cn } from "@/lib/utils";
import { Product } from "../../../core/entities/models/product";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
  isChecked: boolean;
  onChange: (id: number, checked: boolean) => void;
}

export default function ProductCard({
  product,
  isChecked,
  onChange,
}: ProductCardProps) {
  return (
    <label
      className={cn(
        "relative group w-60 h-72 md:w-auto md:h-auto flex flex-col gap-6 border cursor-pointer rounded-2xl p-2 md:p-3",
        isChecked ? " border-blue-500" : "border-neutral-600"
      )}
    >
      <input
        type="checkbox"
        checked={isChecked}
        onChange={(e) => onChange(product.id, e.target.checked)}
        className="sr-only" //hidden but still accessible
      />
      <div className="w-48 h-32 md:w-56 md:h-56">
        <Image
          src={product.imageUrl}
          width={1000}
          height={1000}
          className="max-w-full rounded-2xl opacity-80 group-hover:opacity-100 duration-150"
          alt={`${product.name}`}
        />
      </div>
      <div className="opacity-80 group-hover:opacity-100 duration-150 px-2 mt-12 md:mt-0 text-sm md:text-base">
        <p>{product.name}</p>
        <p>{product.type}</p>
        <p>{product.price}</p>
      </div>
    </label>
  );
}

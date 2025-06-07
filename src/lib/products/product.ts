export type Product = {
  id: number;
  name: string;
  type: "fresh" | "external" | "in-stock";
  price: number;
  imageUrl: string;
};

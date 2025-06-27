import { Product } from "../../entities/models/product";

//just the interface no actual implementations here. similar to how spring boot was;
export interface ProductRepository {
  getProducts: () => Promise<Product[]>;
  getProductsByIds: (ids: string[]) => Promise<Product[]>;
}

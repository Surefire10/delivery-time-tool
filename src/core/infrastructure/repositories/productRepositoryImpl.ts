import { ProductRepository } from "../../application/repositories/product.repository.interface";
import { products } from "../../../lib/products/data";

export class ProductRepositoryImpl implements ProductRepository {
  async getProducts() {
    return products;
  }
  async getProductsByIds(ids: string[]) {
    return products.filter((product) => {
      return ids.includes("" + product.id);
    });
  }
}

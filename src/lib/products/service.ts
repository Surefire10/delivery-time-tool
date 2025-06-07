import { products } from "./data";

export class ProductService {
  async getProductsByIds(ids: string[]) {
    return products.filter((product) => {
      return ids.includes("" + product.id);
    });
  }
}

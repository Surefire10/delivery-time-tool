import { ProductRepository } from "../../repositories/product.repository.interface";

export class GetAllProducts {
  constructor(private readonly productRepo: ProductRepository) {}

  async execute() {
    return await this.productRepo.getProducts();
  }
}

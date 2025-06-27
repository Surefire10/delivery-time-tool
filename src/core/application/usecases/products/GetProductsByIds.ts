import { ProductRepository } from "../../repositories/product.repository.interface";

export class GetProductsByIds {
  constructor(private readonly productRepo: ProductRepository) {}

  async execute(ids: string[]) {
    return await this.productRepo.getProductsByIds(ids);
  }
}

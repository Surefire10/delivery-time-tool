import { NextRequest } from "next/server";
import { ProductRepositoryImpl } from "../../../core/infrastructure/repositories/productRepositoryImpl";
import { GetDeliveryTimeslots } from "../../../core/application/usecases/timeslots/GetDeliveryTimeslots";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const ids = searchParams.getAll("product-ids");

    //yep! controllers can directly call the implementation no problem.
    const repo = new ProductRepositoryImpl();
    const useCase = new GetDeliveryTimeslots(repo);
    const data = await useCase.execute(ids);

    return Response.json(data);
  } catch (error: unknown) {
    return Response.json(
      { message: "Internal Server Error", error: error },
      { status: 500 }
    );
  }
}

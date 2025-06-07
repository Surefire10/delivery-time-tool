import { NextRequest } from "next/server";
import { TimeslotService } from "../../../../lib/timeslots/service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const ids = searchParams.getAll("product-ids");

    const timeslotService = new TimeslotService();
    const data = await timeslotService.getCartTimeslots(ids);

    return Response.json(data);
  } catch (error: unknown) {
    return Response.json(
      { message: "Internal Server Error", error: error },
      { status: 500 }
    );
  }
}

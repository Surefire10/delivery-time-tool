import { Timeslot } from "@/types/timeslot";
import { useQuery } from "@tanstack/react-query";

export const useGetTimeslots = (productIds: number[]) => {
  return useQuery<Timeslot[], Error>({
    queryKey: ["timeslots", productIds],
    queryFn: async () => {
      const params = new URLSearchParams();
      productIds.forEach((id) => params.append("product-ids", id.toString()));
      const response = await fetch(`/api/timeslots?${params.toString()}`);
      return response.json();
    },
    enabled: !!(productIds.length > 0),
  });
};

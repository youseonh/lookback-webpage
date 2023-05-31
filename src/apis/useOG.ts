import { useQuery } from "react-query";
import { apiRequest } from "@/src/utils/axios";

export const useGetOpenGraph = (url: string | undefined) => {
  const queryKey = `/api-og/${url}`;
  return useQuery(
    [queryKey],
    async () => {
      const response = await apiRequest({
        path: queryKey,
        method: "GET",
      });
      return response.data;
    },
    { refetchOnWindowFocus: true, retry: 0 },
  );
};

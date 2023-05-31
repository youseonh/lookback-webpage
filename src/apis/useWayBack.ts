import { useQuery } from "react-query";
import { apiRequest } from "@/src/utils/axios";

export const useGetWayBack = (url: string) => {
  const queryKey = `/api/cdx/search/cdx?showSkipCount=true&lastSkipTimestamp=true&matchType=prefix&fl=timestamp,mimetype,original,digest&output=json&from=2013&to=2013&url=${url}`;
  return useQuery(
    [queryKey],
    async () => {
      const response = await apiRequest({
        path: queryKey,
        method: "GET",
      });
      return response.data;
    },
    { refetchOnWindowFocus: true },
  );
};

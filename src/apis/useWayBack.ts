import { useQuery } from "react-query";
import { apiRequest } from "@/src/utils/axios";

export const useGetWayBack = (url: string, from: string, to: string, page: number) => {
  const queryKey = `/api/cdx/search/cdx?url=${url}&from=${from}&to=${to}&output=json&page=${page}&limit=100&fl=timestamp,mimetype,original,digest&showSkipCount=true&fastLatest=true`;
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

export const useGetWayBackMaxPage = (url: string, from: string, to: string) => {
  const queryKey = `/api/cdx/search/cdx?url=${url}&from=${from}&to=${to}&output=json&limit=100&showNumPages=true&showSkipCount=true`;
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

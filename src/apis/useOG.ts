import { useQuery } from "react-query";
import axios from "axios";

export const useGetOpenGraph = (url: string | undefined, options: { staleTime: number; cacheTime: number }) => {
  const queryKey = `/api-og/${url}`;
  return useQuery([queryKey, url], () => axios.get(`${queryKey}`).then((res) => res.data), {
    ...options,
    enabled: !!url,
    refetchOnWindowFocus: false,
    retry: 0,
  });
};

import { useQuery } from "react-query";
import axios from "axios";

export const useGetWayBack = (url: string, options: { staleTime: number; cacheTime: number }) => {
  const queryKey = `/api/cdx/search/cdx?url=${url}&showSkipCount=true&lastSkipTimestamp=true&matchType=prefix&fl=timestamp,mimetype,original,digest&output=json&from=2013&to=2013`;
  const queryFn = axios.get(`${queryKey}`).then((res) => res.data);
  return useQuery([queryKey, url], () => queryFn, {
    ...options,
    enabled: !!url,
    refetchOnWindowFocus: false,
  });
};

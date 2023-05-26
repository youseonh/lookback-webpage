import { useQuery, useMutation, QueryOptions } from "react-query";
import axios from "axios";

// url = "https://www.google.com"

// params = {
//     "date_range": "2013-01-01:2023-01-01"
// }

// response = requests.get("https://archive.org/wayback/web/v1/" +
// url, params=params)

// [QueryKey] 는 고유한 키입니다. React Query는 해당 키로 값을 불러오고 저장합니다.
// [queryFn] 서버와 통신하여 데이터를 받아오는 비동기 함수를 넣어주시면 됩니다.
// [Stale Time]
// 기본 값은 0인데 이는 useQuery가 해당 키로 실행될 때 서버에서
// 항상 다시 받아오는 것을 의미합니다.
// 만약 5분이라면 5분 동안은 서버에서 받아오지 않고 기존에 가지고 있는 값을 그대로 보여줍니다.

// [CacheTime]
// 기본 값은 5분인데, unMount 되어서 inActivate가 되면 카운트가 됩니다.
// 5분이 지나면 가비지 콜렉터가 캐시데이터를 지웁니다.
// 만약 캐시가 지워지기 전에 Mount 된다면 데이터가 fetch 되는 동안 Cache되어 있던 Data를 보여줍니다.
export const useGetWayBack = (url: string, options: { staleTime: number; cacheTime: number }) => {
  const queryKey = `/api/cdx/search/cdx`;
  const queryFn = axios
    .get(`${queryKey}?url=${url}/&matchType=prefix&fl=timestamp,mimetype,original,digest&output=json&from=2013&to=2013`)
    .then((res) => res.data);
  return useQuery([queryKey, url], () => queryFn, { ...options });

  // return { queryKey, queryFn };
};

// // useMutation 예시
// export const usePutUser = async (data: IUser, options: QueryOptions) => {
//   const queryKey = `https://api.test.com/user`;
//   const queryFn = await axios.put(`${queryKey}?userId=${data.id}`, data).then((res) => res.data);
//   return useMutation([queryKey, data.id], queryFn, { ...options });
// };

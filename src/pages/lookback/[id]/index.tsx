import MainLayout from "@components/Layout";
import { ContentWrap } from "@pages/styles";
import { Typography } from "antd";
import { useGetWayBack } from "@/src/apis/useWayBack";
import { useRouter } from "next/router";

const Detail = () => {
  const TIME = 1000 * 60 * 5; // 5m
  const { data, loading } = useGetWayBack("www.naver.com", {
    staleTime: TIME,
    cacheTime: TIME,
  });
  const router = useRouter();
  const { Title } = Typography;

  return (
    <MainLayout>
      <ContentWrap>
        <Title> {router.query.id} </Title>
        <p>{data}</p>
      </ContentWrap>
    </MainLayout>
  );
};

export default Detail;

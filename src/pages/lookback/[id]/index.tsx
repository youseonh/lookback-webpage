import MainLayout from "@components/Layout";
import { ContentWrap } from "@pages/styles";
import { Typography, Table } from "antd";
import { useGetWayBack } from "@/src/apis/useWayBack";
import { useRouter } from "next/router";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { localStorageAtom } from "@/src/states";
import { useRecoilValue } from "recoil";
import dayjs from "dayjs";

type AllowedKeys = "key" | "urlkey" | "mimetype" | "statusCode" | "original" | "timestamp" | "digest" | "length";

type DataType = {
  [key in AllowedKeys]: string | number | React.Key;
};
/**
 * 상세 보기 페이지
 */
const Detail = () => {
  const [currentUrl, setCurrentUrl] = useState<string>("");
  const [columns, setColumns] = useState<ColumnsType<DataType>>([]);
  const [tableData, setTableData] = useState<DataType[]>([]);
  const localValues = useRecoilValue(localStorageAtom);

  const router = useRouter();
  const TIME = 1000 * 60 * 5; // 5m
  const { data } = useGetWayBack(currentUrl, {
    staleTime: TIME,
    cacheTime: TIME,
  });

  const init = () => {
    setTableData([]);
  };

  // 현재 url 체크
  const checkCurrentUrl = () => {
    for (const value of localValues) {
      const { name, url } = value;
      if (name === router.query.id && url) {
        setCurrentUrl(url);
      }
    }
  };

  useEffect(() => {
    checkCurrentUrl();
    // 초기화
    init();
    // 받아온 데이터가 있으면
    if (data && data.length !== 0) {
      // const tempColumns = data.shift();
      const tempColumns = data[0];
      setColumns(
        tempColumns.map((col: string) => {
          return { title: col, key: col, dataIndex: col };
        }),
      );
      for (let i = 1; i < data.length; i++) {
        const dataObj = data[i];
        const reducedDatas = tempColumns.reduce((acc, curr: string, idx: AllowedKeys) => {
          if (curr === "timestamp") {
            return { ...acc, [curr]: dayjs(dataObj[idx]).format("YYYY.MM.DD HH:mm:ss") };
          }
          return { ...acc, [curr]: dataObj[idx] };
        }, new Object());
        setTableData((prev) => {
          return [...prev, ...[reducedDatas]];
        });
      }
      // data.forEach((dataObj: DataType) => {
      //   const reducedDatas = tempColumns.reduce((acc, curr: string, idx: AllowedKeys) => {
      //     if (curr === "timestamp") {
      //       return { ...acc, [curr]: dayjs(dataObj[idx]).format("YYYY.MM.DD HH:mm:ss") };
      //     }
      //     return { ...acc, [curr]: dataObj[idx] };
      //   }, new Object());
      //   setTableData((prev) => {
      //     return [...prev, ...[reducedDatas]];
      //   });
      // });
    }
  }, [data]);

  const { Title } = Typography;

  return (
    <MainLayout>
      <ContentWrap>
        <Title> {router.query.id} </Title>
        <Table columns={columns} dataSource={tableData} />
      </ContentWrap>
    </MainLayout>
  );
};

export default Detail;

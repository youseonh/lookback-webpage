import MainLayout from "@components/Layout";
import { ContentWrap } from "@pages/styles";
import { Typography, Table } from "antd";
import { useGetWayBack } from "@/src/apis/useWayBack";
import { useRouter } from "next/router";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import useLocalStorage from "@src/hooks/useLocalStorage";

type AllowedKeys = "key" | "urlkey" | "mimetype" | "statusCode" | "original" | "timestamp" | "digest" | "length";

type DataType = {
  [key in AllowedKeys]: string | number | React.Key;
};
interface ILocalStorage {
  name: string;
  url: string;
}
const Detail = () => {
  const [storedValue, setValue] = useLocalStorage<ILocalStorage[]>("look-web", []);
  const [currentUrl, setCurrentUrl] = useState<string>("");
  const [columns, setColumns] = useState<ColumnsType<DataType>>([]);
  const [tableData, setTableData] = useState<DataType[]>([]);
  const router = useRouter();
  const TIME = 1000 * 60 * 5; // 5m
  const { data, loading } = useGetWayBack(currentUrl, {
    staleTime: TIME,
    cacheTime: TIME,
  });

  const init = () => {
    setTableData([]);
  };

  useEffect(() => {
    // 현재 url 체크
    for (const value of storedValue) {
      const { name, url } = value;
      if (name === router.query.id) {
        setCurrentUrl(url);
      }
    }
    // 초기화
    init();
    // 받아온 데이터가 있으면
    if (data && data.length !== 0) {
      const tempColumns = data.shift();
      setColumns(
        tempColumns.map((col: string) => {
          return { title: col, key: col, dataIndex: col };
        }),
      );

      data.forEach((d: DataType) => {
        const ac = tempColumns.reduce((acc, curr: string, idx: AllowedKeys) => {
          return { ...acc, [curr]: d[idx] };
        }, new Object());
        setTableData((prev) => {
          return [...prev, ...[ac]];
        });
      });

      // const result = tempColumns.reduce((acc, curr, idx) => {
      //   for (let i = 1; i < data.length; i++) {
      //     return { ...acc, [curr]: data[i][idx] };
      //   }
      // }, []);
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

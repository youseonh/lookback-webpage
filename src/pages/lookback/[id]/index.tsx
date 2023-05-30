import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useGetWayBack } from "@/src/apis/useWayBack";
import { useRecoilValue } from "recoil";
import { localStorageAtom } from "@/src/states";
import { Table, Spin } from "antd";
import type { ColumnsType } from "antd/es/table";
import MainLayout from "@components/Layout";
import { ContentWrap } from "@pages/styles";
import dayjs from "dayjs";
import { TitleWrap, StyledTitle, TableWrap } from "./styles";
// import { VirtualTable } from "@components/Table/virtualTableComp";

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
  const { data, isSuccess, isError } = useGetWayBack(currentUrl, {
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
        setCurrentUrl(() => {
          return url;
        });
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
          if (col === "original") {
            return {
              title: col,
              key: col,
              dataIndex: col,
              render: (text: string) => (
                <a href={text} target="_blank" rel="noreferrer">
                  {text}
                </a>
              ),
            };
          }
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
    }
  }, [data, localValues]);

  return (
    <MainLayout>
      <ContentWrap>
        <TitleWrap>
          <StyledTitle> {router.query.id} </StyledTitle>
        </TitleWrap>
        <TableWrap>
          <Spin spinning={!isSuccess && !isError}>
            <Table columns={columns} dataSource={tableData} pagination={{ defaultPageSize: 50 }} />
          </Spin>
        </TableWrap>
        {/* <VirtualTable columns={columns} dataSource={tableData} scroll={{ y: 550, x: "100vw" }} /> */}
      </ContentWrap>
    </MainLayout>
  );
};

export default Detail;

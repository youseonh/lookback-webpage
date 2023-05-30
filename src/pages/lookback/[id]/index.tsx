import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useGetWayBack } from "@/src/apis/useWayBack";
import { useRecoilValue } from "recoil";
import { localStorageAtom } from "@/src/states";
import { Table, Spin } from "antd";
import type { ColumnsType } from "antd/es/table";
import MainLayout from "@components/Layout";
import { MainContainer } from "@pages/styles";
import dayjs from "dayjs";
import { TitleWrap, StyledTitle, TableWrap } from "./styles";
import { TIMEFORMAT } from "@/src/enums/common";
// import { VirtualTable } from "@components/Table/virtualTableComp";

type AllowedKeys = "key" | "urlkey" | "mimetype" | "statusCode" | "original" | "timestamp" | "digest" | "length";

type DataType = {
  [key in AllowedKeys]: string | number | React.Key;
};
/**
 * 상세 보기 페이지
 */
const Detail = () => {
  //Recoil State
  const localValues = useRecoilValue(localStorageAtom);
  // state
  const [currentUrl, setCurrentUrl] = useState<string>("");
  const [columns, setColumns] = useState<ColumnsType<DataType>>([]);
  const [tableData, setTableData] = useState<DataType[]>([]);
  // router
  const router = useRouter();
  // react-query
  const TIME = 1000 * 60 * 5; // 5m
  const { data, isSuccess, isError } = useGetWayBack(currentUrl, {
    staleTime: TIME,
    cacheTime: TIME,
  });

  // url 체크 함수
  const checkCurrentUrl = () => {
    for (const value of localValues) {
      const { name, url } = value;
      if (name === router.query.id && url) {
        return url;
      }
    }
  };

  // 테이블 데이터 생성 함수
  const setDataSource = () => {
    if (data && data.length !== 0) {
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
        const reducedDatas = tempColumns.reduce((acc: ColumnsType, curr: string, idx: AllowedKeys) => {
          if (curr === "timestamp") {
            return { ...acc, [curr]: dayjs(dataObj[idx]).format(TIMEFORMAT.YYYYMMDDHHMMSS) };
          }
          return { ...acc, [curr]: dataObj[idx] };
        }, new Object());
        setTableData((prev) => {
          return [...prev, ...[reducedDatas]];
        });
      }
    }
  };

  useEffect(() => {
    setTableData(() => {
      return [];
    });
    const url = checkCurrentUrl();
    if (url) {
      setCurrentUrl(() => {
        return url;
      });
    }
    setDataSource();
  }, [data, localValues]);

  return (
    <MainLayout>
      <MainContainer>
        <TitleWrap>
          <StyledTitle> {router.query.id} </StyledTitle>
        </TitleWrap>
        <TableWrap>
          <Spin spinning={!isSuccess && !isError}>
            <Table columns={columns} dataSource={tableData} pagination={{ defaultPageSize: 50 }} />
          </Spin>
        </TableWrap>
        {/* <VirtualTable columns={columns} dataSource={tableData} scroll={{ y: 550, x: "100vw" }} /> */}
      </MainContainer>
    </MainLayout>
  );
};

export default Detail;

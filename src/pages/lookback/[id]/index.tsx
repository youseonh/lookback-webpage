import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useGetWayBack, useGetWayBackMaxPage } from "@/src/apis/useWayBack";
import { useRecoilValue } from "recoil";
import { localStorageAtom } from "@/src/states";
import { Table, Spin, Pagination } from "antd";
import type { ColumnsType } from "antd/es/table";
import MainLayout from "@components/Layout";
import dayjs from "dayjs";
import { MainContainer } from "@/src/styles/mainStyles";
import { TitleWrap, StyledTitle, TableWrap } from "@/src/styles/detailStyles";
import { TIMEFORMAT } from "@/src/enums/common";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [currentUrl, setCurrentUrl] = useState<string>("");
  const [columns, setColumns] = useState<ColumnsType<DataType>>([]);
  const [tableData, setTableData] = useState<DataType[]>([]);
  // router
  const router = useRouter();

  // url 체크 함수
  const checkCurrentUrl = () => {
    for (const value of localValues) {
      const { name, url } = value;
      if (name === router.query.id && url) {
        setCurrentUrl(url);
      }
    }
  };
  const today = dayjs();
  const to = today.set("year", today.year()).set("month", 1).set("date", 1);
  const from = to.subtract(10, "year");

  // react-query
  const tableQuery = useGetWayBack(currentUrl, from.format("YYYYMMDD"), to.format("YYYYMMDD"), currentPage);
  const pageQuery = useGetWayBackMaxPage(currentUrl, from.format("YYYYMMDD"), to.format("YYYYMMDD"));

  useEffect(() => {
    setMaxPage(pageQuery.data);
  }, [pageQuery.data]);

  // 테이블 데이터 생성 함수
  const setDataSource = () => {
    const data = tableQuery.data;
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
    checkCurrentUrl();
    setTableData([]);
    setDataSource();
  }, []);

  useEffect(() => {
    setTableData([]);
    setDataSource();
  }, [tableQuery.data]);

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <MainLayout>
      <MainContainer>
        <TitleWrap>
          <StyledTitle> {router.query.id} </StyledTitle>
        </TitleWrap>
        <TableWrap>
          <Spin spinning={!tableQuery.isSuccess && !tableQuery.isError}>
            <Table columns={columns} dataSource={tableData} pagination={false} />
          </Spin>
          {maxPage && (
            <Pagination
              current={currentPage}
              onChange={handleChangePage}
              total={maxPage * 100}
              defaultPageSize={100}
              simple
            />
          )}
        </TableWrap>
      </MainContainer>
    </MainLayout>
  );
};

export default Detail;

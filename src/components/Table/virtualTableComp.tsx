import type { TableProps } from "antd";
import { Table, theme } from "antd";
import classNames from "classnames";
import ResizeObserver from "rc-resize-observer";
import React, { useEffect, useRef, useState } from "react";
import { VariableSizeGrid as Grid } from "react-window";

// TableProps 타입은 테이블의 속성을 나타내는 객체
export const VirtualTable = <RecordType extends object>(props: TableProps<RecordType>) => {
  // columns = 테이블의 열을 나타내는 배열
  // scroll = 테이블의 스크롤 위치
  const { columns, scroll } = props;
  // tableWidth = 테이블의 너비
  const [tableWidth, setTableWidth] = useState(0);
  const { token } = theme.useToken();

  // widthColumnCount = 테이블의 너비를 기준으로 열의 너비 계산
  const widthColumnCount = columns!.filter(({ width }) => !width).length;

  // mergedColumns = 테이블의 열을 하나의 배열로 결합
  const mergedColumns = columns!.map((column) => {
    if (column.width) {
      return column;
    }

    return {
      ...column,
      width: Math.floor(tableWidth / widthColumnCount),
    };
  });

  // gridRef = 테이블의 그리드 컴포넌트 가리킴
  const gridRef = useRef<any>();
  // connectObject = 테이블의 스크롤 위치를 저장
  const [connectObject] = useState<any>(() => {
    const obj = {};
    Object.defineProperty(obj, "scrollLeft", {
      get: () => {
        if (gridRef.current) {
          return gridRef.current?.state?.scrollLeft;
        }
        return null;
      },
      set: (scrollLeft: number) => {
        if (gridRef.current) {
          gridRef.current.scrollTo({ scrollLeft });
        }
      },
    });

    return obj;
  });

  // 테이블의 그리드 컴포넌트를 재설정
  const resetVirtualGrid = () => {
    gridRef.current?.resetAfterIndices({
      columnIndex: 0,
      shouldForceUpdate: true,
    });
  };

  useEffect(() => resetVirtualGrid, [tableWidth]);

  // 테이블의 가상 목록 생성
  // rawData - 테이블에 표시할 데이터
  const renderVirtualList = (rawData: readonly object[], { scrollbarSize, ref, onScroll }: any) => {
    ref.current = connectObject;
    const totalHeight = rawData.length * 54;

    return (
      <Grid
        ref={gridRef}
        className="virtual-grid"
        columnCount={mergedColumns.length}
        columnWidth={(index: number) => {
          const { width } = mergedColumns[index];
          return totalHeight > (scroll?.y as number) && index === mergedColumns.length - 1
            ? (width as number) - scrollbarSize - 1
            : (width as number);
        }}
        height={scroll!.y as number}
        rowCount={rawData.length}
        rowHeight={() => 54}
        width={tableWidth}
        onScroll={({ scrollLeft }: { scrollLeft: number }) => {
          onScroll({ scrollLeft });
        }}>
        {({ columnIndex, rowIndex, style }: { columnIndex: number; rowIndex: number; style: React.CSSProperties }) => (
          <div
            className={classNames("virtual-table-cell", {
              "virtual-table-cell-last": columnIndex === mergedColumns.length - 1,
            })}
            style={{
              ...style,
              boxSizing: "border-box",
              padding: token.padding,
              borderBottom: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
              background: token.colorBgContainer,
            }}>
            {(rawData[rowIndex] as any)[(mergedColumns as any)[columnIndex].dataIndex]}
          </div>
        )}
      </Grid>
    );
  };

  return (
    // 테이블의 너비가 변경될 때마다 setTableWidth 함수 호출
    <ResizeObserver
      onResize={({ width }) => {
        setTableWidth(width);
      }}>
      {/* VirtualTable 함수에서 생성된 가상 목록을 표시 */}
      <Table
        {...props}
        className="virtual-table"
        columns={mergedColumns}
        pagination={false}
        components={{
          body: renderVirtualList,
        }}
      />
    </ResizeObserver>
  );
};

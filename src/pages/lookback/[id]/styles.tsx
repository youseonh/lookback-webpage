import styled from "styled-components";
import { Typography } from "antd";

export const TitleWrap = styled.div`
  box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
  border-radius: 15px;
  background: white;
`;

export const TableWrap = styled.div`
  .ant-table {
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
  }
  .ant-table-container {
    padding: 15px;
  }
`;

export const StyledTitle = styled(Typography.Title)`
  padding-left: 20px;
  padding-bottom: 10px;
  margin: 0px;
`;

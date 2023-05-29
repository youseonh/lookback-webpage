import styled from "styled-components";
import { Card, Button } from "antd";

export const StyledCard = styled(Card)`
  min-width: 250px;
  margin-top: 16;

  .ant-card-body {
    min-height: 120px;
  }
  .ant-card-actions > li {
    margin: 0px;
  }
`;

export const StyledButton = styled(Button)`
  width: 100%;
`;

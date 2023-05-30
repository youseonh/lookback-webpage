import styled from "styled-components";
import { Card, Button } from "antd";

export const StyledCard = styled(Card)`
  /* min-width: 250px; */
  border-radius: 20px;
  margin-top: 16;
  box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
  .ant-card-body {
    min-height: 120px;
  }

  .ant-card-actions {
    border-radius: 0 0 15px 15px;
    > li {
      margin: 0px;
    }
  }
`;

export const StyledButton = styled(Button)`
  width: 100%;
`;

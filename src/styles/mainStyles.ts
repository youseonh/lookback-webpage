import styled from "styled-components";
import { Button, Row } from "antd";

export const basicTheme = {
  colorPrimary: "#9109ff",
  colorBgBase: "#ffffff",
  fontSize: 15,
  colorInfo: "#9109ff",
  colorWarning: "#FA8C16",
  colorSuccess: "#58d619",
};

export const MainContainer = styled.div`
  padding-left: 100px;
  padding-right: 100px;
  padding-top: 30px;
  padding-bottom: 80px;
  height: "100%";
  min-height: 75vh;
`;

export const StyledRow = styled(Row)`
  justify-content: "space-around";
`;

export const ButtonWrap = styled.div`
  width: 100%;
  text-align: right;
  margin-bottom: 30px;
`;

export const StyledButton = styled(Button)`
  box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
`;

export const ModalContent = styled.div`
  width: 100%;
  padding: 20px;
`;

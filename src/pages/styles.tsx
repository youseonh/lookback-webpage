import styled from "styled-components";
import { Button } from "antd";

export const ContentWrap = styled.div`
  /* border-radius: 20px; */
  /* box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px; */
  padding-left: 100px;
  padding-right: 100px;
  padding-top: 30px;
  padding-bottom: 80px;
  height: "100%";
  min-height: 75vh;
  /* background: white; */
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

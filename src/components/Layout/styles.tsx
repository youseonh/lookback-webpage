import styled from "styled-components";
import { Layout } from "antd";

const { Content } = Layout;

export const StyledContent = styled(Content)`
  background: ${(props) => props.color};
  box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
  min-height: calc(100vh - 64px);
  padding: 30px;
  padding-top: 20px;
`;

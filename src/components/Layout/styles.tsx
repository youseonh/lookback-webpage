import styled from "styled-components";
import { Layout } from "antd";

const { Content } = Layout;

export const StyledContent = styled(Content)`
  height: calc(100vh - 64px);
  padding: 30px;
  background: gray;
`;

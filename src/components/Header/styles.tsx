import styled from "styled-components";
import { Layout } from "antd";
const { Header } = Layout;

export const StyledHeader = styled(Header)`
  background: ${(props) => props.color};
  box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
  display: "flex";

  align-items: "center";
  padding-inline: 30x;
`;

export const LogoWrap = styled.div`
  :hover {
    cursor: pointer;
  }
  padding-top: 5px;
  max-width: 60px;
`;

import React from "react";
import type { ReactNode } from "react";
import { Layout } from "antd";
import Header from "@/src/components/Header";
import { StyledContent } from "./styles";
import { theme } from "antd";

type IMainProps = {
  children: ReactNode;
};

const MainLayout = (props: IMainProps) => {
  const { token } = theme.useToken();
  return (
    <Layout className="layout">
      {/* 헤더 */}
      <Header />
      {/* 본문 Content */}
      <StyledContent color={token.colorBgLayout}>{props.children}</StyledContent>
    </Layout>
  );
};

export default MainLayout;

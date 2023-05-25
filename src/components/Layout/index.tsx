import React from "react";
import type { ReactNode } from "react";
import { Layout } from "antd";
import Header from "@/src/components/Header";
import { StyledContent } from "./styles";

type IMainProps = {
  children: ReactNode;
};

const MainLayout = (props: IMainProps) => {
  return (
    <Layout className="layout">
      {/* 헤더 */}
      <Header />
      {/* 본문 Content */}
      <StyledContent className="site-layout">{props.children}</StyledContent>
    </Layout>
  );
};

export default MainLayout;

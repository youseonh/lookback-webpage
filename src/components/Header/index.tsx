import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { theme } from "antd";
import { StyledHeader, LogoWrap } from "./styles";

const MainHeader = () => {
  const { token } = theme.useToken();
  const router = useRouter();
  return (
    <StyledHeader color={token.purple8}>
      {/* 로고 */}
      <LogoWrap onClick={() => router.push("/")}>
        <Image src="/../public/lb-logo-white.png" alt="lb-logo-white" priority width={50} height={55} />
      </LogoWrap>
    </StyledHeader>
  );
};

export default MainHeader;

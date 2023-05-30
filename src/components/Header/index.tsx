import React from "react";
import { StyledHeader, LogoWrap } from "./styles";
import { theme } from "antd";
import Image from "next/image";
const MainHeader = () => {
  const { token } = theme.useToken();
  return (
    <StyledHeader color={token.purple8}>
      {/* 로고 */}
      <LogoWrap>
        <Image src="/../public/lb-logo-white.png" alt="lb-logo-white" width={50} height={55} />
      </LogoWrap>
    </StyledHeader>
  );
};

export default MainHeader;

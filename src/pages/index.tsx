import React, { useState, useEffect, ReactNode } from "react";
import { useRecoilValue } from "recoil";
import { localStorageAtom } from "@/src/states";
import MainLayout from "@components/Layout";
import CustomCard from "@components/Card";
import AddModal from "@components/Modal";
import { MainContainer, ButtonWrap, StyledButton, StyledRow } from "./styles";

const Index = () => {
  // Recoil State
  const localValues = useRecoilValue(localStorageAtom);
  // state
  const [open, setOpen] = useState(false);
  const [cardNodeArr, setCardNodeArr] = useState<ReactNode[]>([]);

  // modal 오픈
  const changeOpen = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  useEffect(() => {
    const newArr = [];
    for (let i = 0; i < 4; i++) {
      if (localValues[i]) {
        newArr.push(<CustomCard key={i} {...localValues[i]} />);
      } else {
        newArr.push(<CustomCard key={i} />);
      }
    }
    setCardNodeArr(newArr);
  }, [localValues]);

  return (
    <MainLayout>
      <MainContainer>
        {/* 추가 버튼 */}
        <ButtonWrap>
          <StyledButton onClick={() => setOpen(true)}>관심 URL 추가</StyledButton>
        </ButtonWrap>
        {/* 모달 */}
        <AddModal title="관심 url 추가" open={open} changeOpen={changeOpen} />
        {/* url 카드 목록 */}
        <StyledRow justify="space-around">
          {cardNodeArr.map((cardNode) => {
            return cardNode;
          })}
        </StyledRow>
      </MainContainer>
    </MainLayout>
  );
};

export default Index;

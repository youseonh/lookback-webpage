import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Card, Col, notification, Skeleton, Popconfirm, message } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { StyledCard, StyledButton } from "./styles";
// import { useGetOpenGraph } from "@/src/apis/useOG";
import { NotificationType } from "@enums/notification";
import { localStorageAtom } from "@/src/states";
import { useRecoilValue, useSetRecoilState } from "recoil";

const { Meta } = Card;

export interface ICard {
  name?: string;
  url?: string;
}

const CustomCard = (props: ICard) => {
  const [api] = notification.useNotification();
  // const [ogImage, setOGImage] = useState<string | null>(null);
  const [isHoverable, setIsHoverable] = useState(false);
  const [loading, setLoding] = useState(true);
  const setLocal = useSetRecoilState(localStorageAtom);
  const localValues = useRecoilValue(localStorageAtom);
  const router = useRouter();

  // const { data } = useGetOpenGraph(props.url);

  // 모달 오픈 함수
  const openNotificationWithIcon = (type: NotificationType, message: string, description: string) => {
    api[type]({
      message,
      description,
    });
  };

  // const getOgImage = () => {
  //   if (data?.data) {
  //     const content = data.data.match(/<meta property="og:image" content="(.+?)">/);
  //     if (content.length >= 2) {
  //       setOGImage(content[1]);
  //     }
  //     if (ogImage) {
  //       return <img alt={ogImage} src={ogImage} width={300} />;
  //     }
  //   }
  // };

  const goToDetailsPage = (name: string | null) => {
    if (name) router.push(`/lookback/${name}`);
  };

  const onClickAdd = () => {
    message.info("수정 기능 준비중입니다.");
  };

  // 삭제하는 함수
  const onClickDelete = () => {
    const newValue = localValues.filter((value) => {
      return value.url !== props.url;
    });
    setLocal(newValue);
    openNotificationWithIcon(NotificationType.SUCCESS, "성공", "해당 관심 url이 삭제되었습니다.");
  };

  useEffect(() => {
    setLoding(true);
    setIsHoverable(false);
    if (props.name && props.url) {
      setIsHoverable(true);
    }
    setLoding(false);
  }, [props.name, props.url]);

  return (
    <Col offset={1} xs={24} sm={11} md={11} lg={11} xl={5}>
      <StyledCard
        hoverable={isHoverable}
        // cover={getOgImage()}
        actions={[
          <>
            <StyledButton type="link" disabled={!isHoverable} onClick={onClickAdd}>
              <EditOutlined key="edit" />
            </StyledButton>
          </>,
          <>
            <Popconfirm
              title="삭제 경고"
              description="정말 삭제하시겠습니까?"
              onConfirm={onClickDelete}
              disabled={!isHoverable}
              okText="Yes"
              cancelText="No"
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}>
              <StyledButton type="link" disabled={!isHoverable}>
                <DeleteOutlined key="delete" />
              </StyledButton>
            </Popconfirm>
          </>,
        ]}>
        <div
          onClick={() => {
            if (isHoverable) goToDetailsPage(props.name ? props.name : null);
          }}>
          <Skeleton loading={loading} title active>
            <Meta
              title={props.name ? props.name : ""}
              description={props.url ? props.url : "관심 URL 정보가 없습니다. 추가해주세요"}
            />
          </Skeleton>
        </div>
      </StyledCard>
    </Col>
  );
};

export default CustomCard;

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Card, Col } from "antd";
import { StyledCard, StyledButton } from "./styles";
import { useOpenGraph } from "@/src/apis/useWayBack";

const { Meta } = Card;

export interface ICard {
  name?: string;
  url?: string;
}

const CustomCard = (props: ICard) => {
  // const [queryUrl, setQueryUrl] = useState<string>(props.url);
  const [ogImage, setOGImage] = useState<string | null>(null);
  const [isHoverable, setIsHoverable] = useState(false);

  const router = useRouter();
  // if (props.url) {
  //   setQueryUrl(props.url);
  // }
  const TIME = 1000 * 60 * 5; // 5m
  const { data, isLoading, isError, isSuccess } = useOpenGraph(props.url, {
    staleTime: TIME,
    cacheTime: TIME,
  });

  const test = () => {
    if (data?.data) {
      const content = data.data.match(/<meta property="og:image" content="(.+?)">/);
      if (content.length >= 2) {
        setOGImage(content[1]);
      }
      if (ogImage) {
        return <Image alt={ogImage} src={ogImage} width={300} />;
      }
    }
  };

  const goToDetailsPage = (name: string | null) => {
    if (name) router.push(`/lookback/${name}`);
  };

  const onClickButton = () => {
    console.log("click Action Button");
  };
  useEffect(() => {
    if (props.name && props.url) {
      setIsHoverable(true);
    }
  }, [props.name, props.url]);

  return (
    <Col span={3}>
      <StyledCard
        hoverable={isHoverable}
        cover={test()}
        actions={[
          <>
            <StyledButton type="link" disabled={!isHoverable} onClick={onClickButton}>
              <EditOutlined key="edit" />
            </StyledButton>
          </>,
          <>
            <StyledButton type="link" disabled={!isHoverable} onClick={onClickButton}>
              <DeleteOutlined key="delete" />
            </StyledButton>
          </>,
        ]}>
        <div
          onClick={() => {
            if (isHoverable) goToDetailsPage(props.name ? props.name : null);
          }}>
          <Meta title={props.name} description={props.url} />
        </div>
      </StyledCard>
    </Col>
  );
};

export default CustomCard;

import React from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Card, Col } from "antd";
import { StyledCard } from "./styles";

const { Meta } = Card;

export interface ICard {
  name: string;
  url: string;
}

const CustomCard = (props: ICard) => {
  return (
    <Col span={3}>
      {/* <BasicCard loading={props.loading}> */}
      <StyledCard
        cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
        actions={[<EditOutlined key="edit" />, <DeleteOutlined key="delete" />]}>
        <Meta title={props.name} description={props.url} />
      </StyledCard>
    </Col>
  );
};

export default CustomCard;

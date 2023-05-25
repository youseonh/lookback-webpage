import React, { useState } from "react";
import { Avatar, Card, Row, Col, Button } from "antd";
import { BasicCard } from "./styles";

const { Meta } = Card;

const CustomCard: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const onClick = () => {
    setLoading(!loading);
  };

  // 컴포넌트를 선언합니다.
  const renderCard = () => {
    const newArr = [];
    for (let i = 0; i < 4; i++) {
      newArr.push(
        <Col span={3}>
          <BasicCard loading={loading}>
            <Meta
              avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />}
              title="Card title"
              description="This is the description"
            />
          </BasicCard>
        </Col>,
      );
    }
    return newArr;
  };

  return (
    <>
      <Button onClick={onClick}>Default</Button>
      <Row justify="space-around" align="middle">
        {renderCard()}
      </Row>
    </>
  );
};

export default CustomCard;

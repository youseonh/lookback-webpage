import React, { useState, useEffect, useRef, ReactNode } from "react";
import { Button, Row, Modal, Form, Input } from "antd";
import MainLayout from "@components/Layout";
import CustomCard from "@components/Card";
import { ContentWrap, ButtonWrap, ModalContent } from "./styles";
import useLocalStorage from "../hooks/useLocalStorage";

interface ILocalStorage {
  name: string;
  url: string;
}
const Index = () => {
  // 모달 관련
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [storedValue, setValue] = useLocalStorage<ILocalStorage[]>("look-web", []);
  const [isUsed, setIsUsed] = useState(false);
  const [cardNodeArr, setCardNodeArr] = useState<ReactNode[]>([]);

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);

      // 같은 url이 있으면 이미 사용중
      for (const value of storedValue) {
        const { name, url } = value;
        if (url && url === form.getFieldValue("url")) {
          setIsUsed(true);
        }
      }

      // 사용중이 아니거나 4개 초과가 아니면
      if (!isUsed && storedValue.length <= 4) {
        setValue([...storedValue, { name: form.getFieldValue("name"), url: form.getFieldValue("url") }]);
      }

      form.resetFields();
      setConfirmLoading(false);
      setIsUsed(false);
    }, 500);
  };

  const handleCancel = () => {
    setOpen(false);
    setIsUsed(false);
  };
  const onClick = () => {
    setOpen(true);
  };
  useEffect(() => {
    const newArr = [];
    for (let i = 0; i < 4; i++) {
      if (storedValue[i]) {
        newArr.push(<CustomCard key={i} {...storedValue[i]} />);
      } else {
        newArr.push(<CustomCard key={i} name="" url="" />);
      }
    }
    setCardNodeArr(newArr);
  }, [storedValue]);

  // 모달 내 form 관련
  const { TextArea } = Input;
  const [form] = Form.useForm();

  useEffect(() => {
    onCheck();
  }, [form]);

  const onCheck = async () => {
    try {
      const values = await form.validateFields();
      console.log("Success:", values);
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
    }
  };
  return (
    <MainLayout>
      <ContentWrap>
        {/* 추가 버튼 */}
        <ButtonWrap>
          <Button onClick={onClick}>관심 URL 추가</Button>
        </ButtonWrap>
        {/* 모달 */}
        <Modal
          title="관심 url 추가"
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}>
          <ModalContent>
            <Form form={form} name="dynamic_rule" style={{ maxWidth: 600 }}>
              <Form.Item name="name" label="이름" rules={[{ required: true, message: "Please input your name" }]}>
                <Input placeholder="사이트 명을 입력해주세요" />
              </Form.Item>
              <Form.Item name="url" label="URL" rules={[{ required: true, message: "Please input your nickname" }]}>
                <TextArea rows={4} placeholder="URL을 입력해주세요" />
              </Form.Item>
            </Form>
          </ModalContent>
        </Modal>
        {/* url 카드 목록 */}
        <Row justify="space-around" align="middle">
          {cardNodeArr.map((cardNode) => {
            return cardNode;
          })}
        </Row>
      </ContentWrap>
    </MainLayout>
  );
};

export default Index;

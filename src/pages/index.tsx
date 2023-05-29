import React, { useState, useEffect, ReactNode } from "react";
import { Button, Row, Modal, Form, Input, notification, message } from "antd";
import MainLayout from "@components/Layout";
import CustomCard from "@components/Card";
import { ContentWrap, ButtonWrap, ModalContent } from "./styles";
import useLocalStorage from "../hooks/useLocalStorage";

type NotificationType = "success" | "info" | "warning" | "error";

interface ILocalStorage {
  name: string;
  url: string;
}

const Index = () => {
  const [api, contextHolder] = notification.useNotification();

  // 모달 관련
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [storedValue, setValue] = useLocalStorage<ILocalStorage[]>("look-web", []);
  const [cardNodeArr, setCardNodeArr] = useState<ReactNode[]>([]);

  const handleOk = () => {
    setConfirmLoading(true);
    const isPass = onCheckValidation();
    if (isPass) {
      save();
      openNotificationWithIcon("success", "성공", "새 관심 URL 저장에 성공하였습니다.");
      setOpen(false);
    }
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onClickAdd = () => {
    setOpen(true);
  };

  // 모달 오픈 함수
  const openNotificationWithIcon = (type: NotificationType, message: string, description: string) => {
    api[type]({
      message,
      description,
    });
  };

  const onCheckValidation = () => {
    if (checkDuplication()) {
      openNotificationWithIcon("warning", "중복", "이미 중복되는 URL이 존재합니다.");
      return false;
    }
    if (checkIsMax()) {
      openNotificationWithIcon("warning", "초과", "최대 4개를 초과할 수 없습니다.");
      return false;
    }
    return true;
  };

  const save = () => {
    setValue([...storedValue, { name: form.getFieldValue("name"), url: form.getFieldValue("url") }]);
  };
  const checkIsMax = () => {
    if (storedValue.length > 4) return true;
    return false;
  };

  const checkDuplication = () => {
    // 같은 url이 있으면 이미 사용중
    for (const value of storedValue) {
      const { name, url } = value;
      if (url && url === form.getFieldValue("url")) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    const newArr = [];
    for (let i = 0; i < 4; i++) {
      if (storedValue[i]) {
        newArr.push(<CustomCard key={i} {...storedValue[i]} />);
      } else {
        newArr.push(<CustomCard key={i} />);
      }
    }
    setCardNodeArr(newArr);
  }, [storedValue]);

  // 모달 내 form 관련
  const { TextArea } = Input;
  const [form] = Form.useForm();

  useEffect(() => {
    onCheckFields();
  }, [form]);

  const onFinish = () => {
    message.success("Submit success!");
  };

  const onFinishFailed = () => {
    message.error("Submit failed!");
  };

  const onCheckFields = async () => {
    try {
      const values = await form.validateFields();
      console.log("Success:", values);
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
    }
  };

  return (
    <MainLayout>
      {contextHolder}
      <ContentWrap>
        {/* 추가 버튼 */}
        <ButtonWrap>
          <Button onClick={onClickAdd}>관심 URL 추가</Button>
        </ButtonWrap>
        {/* 모달 */}
        <Modal
          title="관심 url 추가"
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}>
          <ModalContent>
            <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
              <Form.Item name="name" label="이름" rules={[{ required: true, message: "사이트 명을 입력해주세요" }]}>
                <Input placeholder="사이트 명을 입력해주세요" />
              </Form.Item>
              <Form.Item name="url" label="URL" rules={[{ required: true, message: "URL을 입력해주세요" }]}>
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

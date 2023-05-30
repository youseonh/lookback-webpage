import React, { useState, useEffect, ReactNode } from "react";
import { Row, Modal, Form, Input, notification, message } from "antd";
import MainLayout from "@components/Layout";
import CustomCard from "@components/Card";
import { ContentWrap, ButtonWrap, ModalContent } from "./styles";
import { NotificationType } from "@/src/constant/notification";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { localStorageAtom } from "@/src/states";
import { StyledButton } from "./styles";

const Index = () => {
  const [api, contextHolder] = notification.useNotification();

  // 모달 관련
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [cardNodeArr, setCardNodeArr] = useState<ReactNode[]>([]);
  const setLocal = useSetRecoilState(localStorageAtom);

  const localValues = useRecoilValue(localStorageAtom);

  const handleOk = () => {
    setConfirmLoading(true);
    const isPass = onCheckValidation();
    if (isPass) {
      save();
      openNotificationWithIcon(NotificationType.SUCCESS, "성공", "새 관심 URL 저장에 성공하였습니다.");
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
      openNotificationWithIcon(NotificationType.WARNING, "중복", "이미 중복되는 URL이 존재합니다.");
      return false;
    }
    if (checkIsMax()) {
      openNotificationWithIcon(NotificationType.WARNING, "초과", "최대 4개를 초과할 수 없습니다.");
      return false;
    }
    return true;
  };

  const save = () => {
    setLocal([...localValues, { name: form.getFieldValue("name"), url: form.getFieldValue("url") }]);
    // setValue([...storedValue, { name: form.getFieldValue("name"), url: form.getFieldValue("url") }]);
  };

  const checkIsMax = () => {
    if (localValues.length > 4) return true;
    return false;
  };

  const checkDuplication = () => {
    // 같은 url이 있으면 이미 사용중
    for (const value of localValues) {
      const { url } = value;
      if (url && url === form.getFieldValue("url")) {
        return true;
      }
    }
    return false;
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
          <StyledButton onClick={onClickAdd}>관심 URL 추가</StyledButton>
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
        <Row justify="space-around">
          {cardNodeArr.map((cardNode) => {
            return cardNode;
          })}
        </Row>
      </ContentWrap>
    </MainLayout>
  );
};

export default Index;

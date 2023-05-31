import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { localStorageAtom } from "@/src/states";
import { ModalContent } from "./styles";
import { Form, Modal, notification } from "antd";
import { NotificationType } from "@enums/notification";
import AddForm from "@components/Form/addUrlForm";
import { openBasicNotify } from "@/src/utils/notification";

interface IProps {
  title: string;
  open: boolean;
  changeOpen: (open: boolean) => void;
}

const AddModal = (props: IProps) => {
  // Recoil State
  const localValues = useRecoilValue(localStorageAtom);
  const setLocal = useSetRecoilState(localStorageAtom);
  // state
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  const values = Form.useWatch([], form);

  // 4개 Max 초과 여부 확인
  const checkIsMax = () => {
    if (localValues.length > 4) return true;
    return false;
  };

  // 중복 url 존재 여부 확인
  const checkDuplication = () => {
    const formUrl = form.getFieldValue("url");
    for (const value of localValues) {
      const { url } = value;
      if (url && url === formUrl) {
        return true;
      }
    }
    return false;
  };

  // 저장 전 유효성 검증
  const onCheckValidation = () => {
    const name = form.getFieldValue("name");
    const url = form.getFieldValue("url");
    if (!name || !url || name === "" || url === "") {
      if (submit) {
        openBasicNotify(api, NotificationType.WARNING, "", "빈 값이 존재합니다.");
      }
      return false;
    }
    if (checkDuplication()) {
      openBasicNotify(api, NotificationType.WARNING, "중복", "이미 중복되는 URL이 존재합니다.");
      return false;
    }
    if (checkIsMax()) {
      openBasicNotify(api, NotificationType.WARNING, "초과", "최대 4개를 초과할 수 없습니다.");
      return false;
    }
    return true;
  };

  // 저장 함수
  const save = (name: string, url: string) => {
    setLocal([...localValues, { name, url }]);
  };

  // modal 액션 - 확인
  const handleOk = async () => {
    setConfirmLoading(true);
    setSubmit(false);
    const isPass = onCheckValidation();
    if (submit && isPass) {
      const name = form.getFieldValue("name");
      const url = form.getFieldValue("url");
      save(name, url);
      openBasicNotify(api, NotificationType.SUCCESS, "성공", "새 관심 URL 저장에 성공하였습니다.");
      props.changeOpen(false);
    }
    setConfirmLoading(false);
  };

  // modal 액션 - 취소
  const handleCancel = () => {
    form.resetFields();
    setConfirmLoading(false);
    props.changeOpen(false);
  };

  useEffect(() => {
    form
      .validateFields()
      .then(() => {
        setSubmit(true);
      })
      .catch(() => {
        setSubmit(false);
      });
  }, [form, values]);

  return (
    <>
      {contextHolder}
      <Modal
        title={props.title}
        open={props.open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}>
        <ModalContent>
          <AddForm form={form} />
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddModal;

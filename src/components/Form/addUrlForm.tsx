import React from "react";
import { Form, Input } from "antd";
import type { FormInstance } from "antd";

interface IProps {
  form: FormInstance;
}
const AddForm = (props: IProps) => {
  const { TextArea } = Input;

  return (
    <Form form={props.form}>
      <Form.Item
        name="name"
        label="이름"
        rules={[
          { required: true, message: "사이트 명을 입력해주세요" },
          { type: "string", min: 1, max: 20, message: "1글자 이상 20자 이하로 입력해주세요" },
        ]}>
        <Input placeholder="사이트 명" />
      </Form.Item>
      <Form.Item
        name="url"
        label="URL"
        rules={[
          { required: true, message: "URL을 입력해주세요" },
          { type: "url", message: "URL형식이 아닙니다." },
          { type: "string", min: 6, max: 255, message: "6글자 이상 255자 이하로 입력해주세요" },
        ]}>
        <TextArea rows={4} placeholder="URL" />
      </Form.Item>
    </Form>
  );
};

export default AddForm;

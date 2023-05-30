import { NotificationType } from "@enums/notification";
import { NotificationInstance } from "antd/es/notification/interface";

// 모달 오픈 함수
export const openBasicNotify = (
  api: NotificationInstance,
  type: NotificationType,
  message: string,
  description: string,
) => {
  api[type]({
    message,
    description,
  });
};

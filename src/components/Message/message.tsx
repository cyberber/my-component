/*
 * @Author: cyberber 978265004@qq.com
 * @Date: 2025-01-06 12:24:05
 * @LastEditors: cyberber 978265004@qq.com
 * @LastEditTime: 2025-01-06 13:28:28
 * @FilePath: /my-component/src/components/Message/message.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import classNames from "classnames";

export type MessageType = "success" | "info" | "warning" | "error";

interface MessageProps {
  content: string;
  type?: MessageType;
  duration?: number;
  onClose?: () => void;
}

let messageContainer: HTMLDivElement | null = null;

const Message: React.FC<MessageProps> = (props) => {
  const { content, type = "info", duration = 3000, onClose } = props;

  const classes = classNames("viking-message", {
    [`viking-message-${type}`]: type,
  });

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <div className={classes}>
      <span className="viking-message-content">{content}</span>
    </div>
  );
};

const createMessage = (props: MessageProps) => {
  if (!messageContainer) {
    messageContainer = document.createElement("div");
    messageContainer.className = "viking-message-container";
    document.body.appendChild(messageContainer);
  }

  const div = document.createElement("div");
  messageContainer.appendChild(div);

  const destroy = () => {
    messageContainer?.removeChild(div);
    root.unmount(); // Replace ReactDOM.unmountComponentAtNode(div)
    props.onClose?.();
  };

  const root = ReactDOM.createRoot(div);
  root.render(<Message {...props} onClose={destroy} />);
};

export const message = {
  info(content: string, duration?: number) {
    return createMessage({ content, type: "info", duration });
  },
  success(content: string, duration?: number) {
    return createMessage({ content, type: "success", duration });
  },
  warning(content: string, duration?: number) {
    return createMessage({ content, type: "warning", duration });
  },
  error(content: string, duration?: number) {
    return createMessage({ content, type: "error", duration });
  },
};

/*
 * @Author: cyberber 978265004@qq.com
 * @Date: 2025-01-02 15:05:59
 * @LastEditors: cyberber 978265004@qq.com
 * @LastEditTime: 2025-01-09 16:28:04
 * @FilePath: /my-component/src/components/Alert/alert.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// alert组件有什么东西
// 1. 各种状态 success defaule failue
// 2. 展示时间 延时状态 duration
// 3. 关闭的回调函数

import classNames from "classnames";
import React, { FC, ReactNode } from "react";

type AlertType = "success" | "info" | "warining" | "error";
interface AlertProps {
  title: string;
  description: string;
  onClose: () => void;
  icon: ReactNode;
  type: AlertType;
  closeable: boolean;
}

const Alert: FC<AlertProps> = (props) => {
  const { title, description, onClose, icon, type, closeable } = props;
  const classes = classNames("viking-alert", {
    [`viking-alert-${type}`]: type,
  });
  return <div></div>;
};

export default Alert;

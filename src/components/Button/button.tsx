import classnames from "classnames";
import React, { FC } from "react";

export type ButtonSizeType = 'large' | 'small' | 'default';
export type ButtonType = "primary" | "dashed" | "link" | "text" | "default";

interface BaseButtonProp {
  classNames: string;
  disabled: boolean;
  size: ButtonSizeType;
  type: ButtonType;
  children: React.ReactNode;
  href: string;
}

type BaseButtonProps = Partial<BaseButtonProp>;

const Button: FC<BaseButtonProps> = (props) => {
  const { classNames, disabled, size, type, children, ...restProps } = props;
  const cls = classnames(classNames, {
    [`btn-${type}`]: type,
    [`btn-${size}`]: size,
  });
  if (type === "link" && restProps.href) {
    return (
      <a className={cls} href={restProps.href}>
        {children}
      </a>
    );
  } else {
    return <button className={cls} disabled={disabled}>{children}</button>;
  }
};

export default Button;

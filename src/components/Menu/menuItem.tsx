/*
 * @Author: cyberber 978265004@qq.com
 * @Date: 2024-12-16 15:21:40
 * @LastEditors: cyberber 978265004@qq.com
 * @LastEditTime: 2024-12-30 21:48:15
 * @FilePath: /my-component/src/components/Menu/menuItem.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import classNames from "classnames";
import React, { useContext } from "react";
import { MenuContext } from "./menu";

export interface MenuItemProps {
  disable?: boolean;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  index: number;
}
const MenuItem: React.FC<MenuItemProps> = (props) => {
  const context = useContext(MenuContext);
  const { children, className, style, disable, index } = props;
  const classes = classNames(className, "menu-item", {
    "is-active": context.index === index,
  });

  const handleClick = () => {
    if (context.onSelect && !disable) {
      context.onSelect(index);
    }
  };

  return (
    <li style={style} className={classes} onClick={handleClick}>
      {children}
    </li>
  );
};

export default MenuItem;

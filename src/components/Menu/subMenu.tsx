/*
 * @Author: cyberber 978265004@qq.com
 * @Date: 2024-12-26 10:56:44
 * @LastEditors: cyberber 978265004@qq.com
 * @LastEditTime: 2025-01-11 21:27:12
 * @FilePath: /my-component/src/components/Menu/subMenu.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { FunctionComponent, FunctionComponentElement } from "react";
import { MenuItemProps } from "./menuItem";

interface SubMenuProps {
  index: number;
  className: string;
  children?: React.ReactNode;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const { index, className, children } = props;
  return <div>1213</div>;
};

export default SubMenu;

/*
 * @Author: cyberber 978265004@qq.com
 * @Date: 2024-12-16 09:09:30
 * @LastEditors: cyberber 978265004@qq.com
 * @LastEditTime: 2024-12-26 10:55:40
 * @FilePath: /my-component/src/components/Menu/menu.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { createContext } from "react";
import classNames from "classnames";
import { useState } from "react";

type MenuMode = "horizontal" | "veritical";
type SelectCallBack = (selectIndex: number) => void;
export interface MenuProps {
  defaultIndex?: number;
  className?: string;
  mode: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallBack;
  children: React.ReactNode;
}

interface IMenuContext {
  index: number;
  onSelect?: SelectCallBack;
}

export const MenuContext = createContext<IMenuContext>({ index: 0 });

const Menu: React.FC<MenuProps> = (props) => {
  const { className, defaultIndex, mode, style, children, onSelect } = props;
  const [SelectIndex, setSelectIndex] = useState(defaultIndex);
  const classes = classNames("viking-menu", className, {
    "menu-veritical": mode === "veritical",
  });
  const handleMenuItemSelect = (index: number) => {
    setSelectIndex(index);
    if (onSelect) {
      onSelect(index);
    }
  };
  const passedContext: IMenuContext = {
    index: SelectIndex ? SelectIndex : 0,
    onSelect: handleMenuItemSelect,
  };
  return (
    <MenuContext.Provider value={passedContext}>
      <ul className={classes} style={style}>
        {children}
      </ul>
    </MenuContext.Provider>
  );
};

export default Menu;

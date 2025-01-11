/*
 * @Author: cyberber 978265004@qq.com
 * @Date: 2024-12-26 10:56:44
 * @LastEditors: cyberber 978265004@qq.com
 * @LastEditTime: 2025-01-02 14:22:53
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
  const renderChildren = () => {
    const subMenuClasses = classNames('viking-submenu', {
      'menu-opened': menuOpen
    })
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>
      if (childElement.type.displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`
        })
      } else {
        console.error("Warning: SubMenu has a child which is not a MenuItem component")
      }
    })
    return (
      <Transition
        in={menuOpen}
        timeout={300}
        animation="zoom-in-top"
      >
        <ul className={subMenuClasses}>
          {childrenComponent}
        </ul>
      </Transition>
    )
  }
  };
  return <div>1213</div>;
};

export default SubMenu;

/*
 * @Author: cyberber 978265004@qq.com
 * @Date: 2024-07-27 10:38:34
 * @LastEditors: cyberber 978265004@qq.com
 * @LastEditTime: 2025-01-09 21:22:04
 * @FilePath: /my-component/src/App.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
// import Button from "./components/Button/button";
// import Time from "./Time";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import message from "./components/Message";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <Time />
    <Button type="link" href="wwww.baidu.com">
      hellow
    </Button>
    <Button size="small" type="primary">
      test
    </Button> */}
    <Menu mode="veritical" defaultIndex={1} onSelect={(index) => alert(index)}>
      <MenuItem index={1}>12121</MenuItem>
      <MenuItem index={2}>32321</MenuItem>
      <MenuItem index={3}>45451</MenuItem>
    </Menu>
    <button
      onClick={() => {
        message.success("这是一条成功消息");

        // 其他类型
        message.info("这是一条信息");
        message.warning("这是一条警告");
        message.error("这是一条错误信息");

        // 自定义显示时间（毫秒）
        message.info("这条消息将显示 5 秒", 5000);
      }}
    >
      显示消息
    </button>
  </React.StrictMode>
);

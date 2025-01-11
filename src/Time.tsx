/*
 * @Author: cyberber 978265004@qq.com
 * @Date: 2024-11-16 21:25:52
 * @LastEditors: cyberber 978265004@qq.com
 * @LastEditTime: 2024-12-12 14:49:43
 * @FilePath: /my-component/src/Time.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState, useEffect } from "react";

const Time: React.FC = () => {
  const [time, setTime] = useState(0);
  useEffect(() => {
    document.title = `点击了${time}次`;
  }, [time]);
  const handleAlertClick = () => {
    setTimeout(() => {
      alert(time);
    }, 3000);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(Number(e.target.value));
  };
  return (
    <div>
      <button onClick={() => setTime(time + 1)}>1212</button>
      <button onClick={() => handleAlertClick()}>1212</button>
      <input type="text" onChange={(e) => handleInputChange(e)} value={time} />
    </div>
  );
};

export default Time;

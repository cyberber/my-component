/*
 * @Author: cyberber 978265004@qq.com
 * @Date: 2024-11-16 21:25:52
 * @LastEditors: cyberber 978265004@qq.com
 * @LastEditTime: 2025-03-03 21:21:59
 * @FilePath: /my-component/src/Time.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState, useEffect } from "react";
import StoreSelector from "./components/StoreSelector";
import { TreeNode } from "./components/Tree/types";
import message from "./components/Message";
const Time: React.FC = () => {
  const [selectorVisible, setSelectorVisible] = useState(false);
  const [selectedStore, setSelectedStore] = useState<TreeNode | null>(null);

  const handleStoreSelect = (store: TreeNode) => {
    setSelectedStore(store);
    message.success(`已选择门店：${store.label}`);
  };
  return (
    <div>
      <div style={{ marginTop: "20px" }}>
        <h2>门店选择器示例</h2>
        <button
          onClick={() => setSelectorVisible(true)}
          style={{
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          选择门店
        </button>
        {selectedStore && (
          <div style={{ marginTop: "12px" }}>
            已选择门店：{selectedStore.label}
          </div>
        )}
      </div>

      <StoreSelector
        visible={selectorVisible}
        onClose={() => setSelectorVisible(false)}
        onSelect={handleStoreSelect}
      />
    </div>
  );
};

export default Time;

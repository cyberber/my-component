/*
 * @Author: cyberber 978265004@qq.com
 * @Date: 2024-07-27 10:38:34
 * @LastEditors: cyberber 978265004@qq.com
 * @LastEditTime: 2025-03-04 10:58:11
 * @FilePath: /my-component/src/App.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
// import Button from "./components/Button/button";
import Time from "./Time";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import message from "./components/Message";
import StoreSelector from "./components/StoreSelector";
import { TreeNode } from "./components/Tree/types";
import DynamicForm from "./components/DynamicForm";
import FileUpload from "./components/FileUpload";

// 自定义评分组件
const RatingComponent = ({ value, onChange, field }) => {
  return (
    <div className="rating-control">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${star <= (value || 0) ? "active" : ""}`}
          onClick={() => onChange(field.name, star)}
          style={{
            cursor: "pointer",
            color: star <= (value || 0) ? "#FFCC00" : "#CCCCCC",
            fontSize: "24px",
            marginRight: "5px",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const App = () => {
  const [selectorVisible, setSelectorVisible] = useState(false);
  const [selectedStores, setSelectedStores] = useState<TreeNode[]>([]);

  // 表单字段配置
  const formFields = [
    {
      name: "username",
      label: "用户名",
      type: "text",
      placeholder: "请输入用户名",
      required: true,
      rules: [
        { required: true, message: "用户名不能为空" },
        {
          pattern: /^[a-zA-Z0-9_]{3,20}$/,
          message: "用户名必须是3-20位字母、数字或下划线",
        },
      ],
    },
    {
      name: "email",
      label: "邮箱",
      type: "text",
      placeholder: "请输入邮箱",
      rules: [
        {
          pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
          message: "请输入有效的邮箱地址",
        },
      ],
      width: "100%",
    },
    {
      name: "gender",
      label: "性别",
      type: "radio",
      options: [
        { label: "男", value: "male" },
        { label: "女", value: "female" },
        { label: "其他", value: "other" },
      ],
      required: true,
    },
    {
      name: "interests",
      label: "兴趣爱好",
      type: "checkbox",
      options: [
        { label: "阅读", value: "reading" },
        { label: "音乐", value: "music" },
        { label: "运动", value: "sports" },
        { label: "旅行", value: "travel" },
      ],
      width: "100%",
    },
    {
      name: "department",
      label: "部门",
      type: "select",
      options: [
        { label: "技术部", value: "tech" },
        { label: "产品部", value: "product" },
        { label: "市场部", value: "marketing" },
        { label: "人力资源", value: "hr" },
      ],
      placeholder: "请选择部门",
      width: "50%",
    },
    {
      name: "satisfaction",
      label: "满意度",
      type: "custom",
      renderComponent: RatingComponent,
      width: "50%",
    },
    {
      name: "description",
      label: "个人介绍",
      type: "textarea",
      placeholder: "请简单介绍一下自己",
      width: "100%",
    },
  ];

  // 表单提交处理
  const handleFormSubmit = (values: Record<string, any>) => {
    console.log("表单提交:", values);
    message.success("表单提交成功！");
  };

  const handleStoresSelect = (stores: TreeNode[]) => {
    setSelectedStores(stores);
    message.success(`已选择 ${stores.length} 家门店`);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      {/* <Time />
      <Button type="link" href="wwww.baidu.com">
        hellow
      </Button>
      <Button size="small" type="primary">
        test
      </Button> */}
      <h2>动态表单示例</h2>
      <DynamicForm
        fields={formFields}
        onSubmit={handleFormSubmit}
        initialValues={{
          gender: "male",
          satisfaction: 3,
          interests: ["reading", "music"],
        }}
        layout="horizontal"
      />

      <h2 style={{ marginTop: "40px" }}>门店选择器示例（多选）</h2>
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
      {selectedStores.length > 0 && (
        <div style={{ marginTop: "12px" }}>
          已选择 {selectedStores.length} 家门店：
          <ul>
            {selectedStores.map((store) => (
              <li key={store.id}>{store.label}</li>
            ))}
          </ul>
        </div>
      )}

      <StoreSelector
        visible={selectorVisible}
        onClose={() => setSelectorVisible(false)}
        onSelect={handleStoresSelect}
        maxSelection={5}
      />

      <h2 style={{ marginTop: "40px" }}>大文件上传示例</h2>
      <FileUpload
        action=""
        chunkSize={2 * 1024 * 1024} // 2MB
        maxSize={1024 * 1024 * 1024} // 1GB
        onSuccess={(response) => {
          console.log("上传成功:", response);
        }}
        onError={(error) => {
          console.error("上传失败:", error);
        }}
        onProgress={(percentage) => {
          console.log("上传进度:", percentage);
        }}
      />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

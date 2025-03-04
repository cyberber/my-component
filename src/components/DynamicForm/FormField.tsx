import React from "react";
import { FormFieldProps, CustomRenderFn } from "./types";
import classNames from "classnames";

const FormField: React.FC<FormFieldProps> = ({
  field,
  value,
  onChange,
  error,
}) => {
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const newValue =
      field.type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : e.target.value;
    onChange(field.name, newValue);
  };

  // 渲染自定义组件
  const renderCustomComponent = () => {
    if (!field.renderComponent) return null;

    const componentProps = {
      field,
      value,
      onChange,
      error,
      ...field.componentProps,
    };

    // 处理函数类型的自定义渲染器
    if (typeof field.renderComponent === "function") {
      return (field.renderComponent as CustomRenderFn)(componentProps);
    }

    // 处理React组件类型的自定义渲染器
    const CustomComponent = field.renderComponent as React.ComponentType<any>;
    return <CustomComponent {...componentProps} />;
  };

  const renderField = () => {
    // 处理自定义组件类型
    if (field.type === "custom") {
      return renderCustomComponent();
    }

    // 其他字段类型的渲染逻辑保持不变
    switch (field.type) {
      case "text":
      case "number":
        return (
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            value={value || ""}
            onChange={handleChange}
            placeholder={field.placeholder}
            className={classNames("dynamic-form-input", {
              "input-error": error,
            })}
            required={field.required}
          />
        );

      case "textarea":
        return (
          <textarea
            id={field.name}
            name={field.name}
            value={value || ""}
            onChange={handleChange}
            placeholder={field.placeholder}
            className={classNames("dynamic-form-textarea", {
              "input-error": error,
            })}
            required={field.required}
          />
        );

      case "select":
        return (
          <select
            id={field.name}
            name={field.name}
            value={value || ""}
            onChange={handleChange}
            className={classNames("dynamic-form-select", {
              "input-error": error,
            })}
            required={field.required}
          >
            <option value="">请选择</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case "checkbox":
        return (
          <input
            type="checkbox"
            id={field.name}
            name={field.name}
            checked={!!value}
            onChange={handleChange}
            className="dynamic-form-checkbox"
          />
        );

      case "radio":
        return (
          <div className="radio-group">
            {field.options?.map((option) => (
              <label key={option.value} className="radio-label">
                <input
                  type="radio"
                  name={field.name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={() => onChange(field.name, option.value)}
                  className="dynamic-form-radio"
                />
                {option.label}
              </label>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={classNames("dynamic-form-field", `field-${field.type}`)}
      style={{ width: field.width }}
    >
      <label htmlFor={field.name} className="field-label">
        {field.required && <span className="required-mark">*</span>}
        {field.label}
      </label>
      <div className="field-control">
        {renderField()}
        {error && <div className="field-error">{error}</div>}
      </div>
    </div>
  );
};

export default FormField;

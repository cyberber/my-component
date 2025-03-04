import React, { useState, useEffect } from "react";
import FormField from "./FormField";
import { DynamicFormProps, ValidationRule } from "./types";
import "./styles.scss";

const DynamicForm: React.FC<DynamicFormProps> = ({
  fields,
  onSubmit,
  initialValues = {},
  layout = "horizontal",
  submitButtonText = "提交",
  resetButtonText = "重置",
  showReset = true,
  className = "",
}) => {
  const [values, setValues] = useState<Record<string, any>>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // 当initialValues变化时更新表单值
    setValues(initialValues);
  }, [initialValues]);

  const handleChange = (name: string, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));

    // 清除错误信息
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateField = async (
    name: string,
    value: any,
    rules?: ValidationRule[]
  ): Promise<string | null> => {
    if (!rules || rules.length === 0) return null;

    for (const rule of rules) {
      // 必填验证
      if (
        rule.required &&
        (value === undefined || value === null || value === "")
      ) {
        return rule.message || `${name} 是必填字段`;
      }

      // 正则表达式验证
      if (rule.pattern && !rule.pattern.test(String(value))) {
        return rule.message || `${name} 格式不正确`;
      }

      // 自定义验证函数
      if (rule.validator) {
        try {
          const result = await rule.validator(value);
          if (!result) {
            return rule.message || `${name} 验证失败`;
          }
        } catch (error) {
          return String(error) || `${name} 验证异常`;
        }
      }
    }

    return null;
  };

  const validateForm = async (): Promise<boolean> => {
    const newErrors: Record<string, string> = {};
    const newTouched: Record<string, boolean> = { ...touched };

    for (const field of fields) {
      const value = values[field.name];
      newTouched[field.name] = true;

      const error = await validateField(field.label, value, field.rules);
      if (error) {
        newErrors[field.name] = error;
      }
    }

    setErrors(newErrors);
    setTouched(newTouched);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await validateForm();

    if (isValid) {
      onSubmit(values);
    }
  };

  const handleReset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`dynamic-form layout-${layout} ${className}`}
    >
      <div className="form-fields">
        {fields.map((field) => (
          <FormField
            key={field.name}
            field={field}
            value={values[field.name]}
            onChange={handleChange}
            error={touched[field.name] ? errors[field.name] : undefined}
          />
        ))}
      </div>
      <div className="form-actions">
        <button type="submit" className="submit-button">
          {submitButtonText}
        </button>
        {showReset && (
          <button type="button" className="reset-button" onClick={handleReset}>
            {resetButtonText}
          </button>
        )}
      </div>
    </form>
  );
};

export default DynamicForm;

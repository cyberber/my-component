export type FieldType = 'text' | 'number' | 'select' | 'checkbox' | 'radio' | 'textarea' | 'custom';

export interface Option {
  label: string;
  value: string | number;
}

export interface FormFieldConfig {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  options?: Option[];
  defaultValue?: any;
  rules?: ValidationRule[];
  width?: string | number;
  renderComponent?: CustomRenderFn | React.ComponentType<any>;
  componentProps?: Record<string, any>;
}

export interface ValidationRule {
  required?: boolean;
  message?: string;
  pattern?: RegExp;
  validator?: (value: any) => boolean | Promise<boolean>;
}

export interface DynamicFormProps {
  fields: FormFieldConfig[];
  onSubmit: (values: Record<string, any>) => void;
  initialValues?: Record<string, any>;
  layout?: 'horizontal' | 'vertical';
  submitButtonText?: string;
  resetButtonText?: string;
  showReset?: boolean;
  className?: string;
}

export interface FormFieldProps {
  field: FormFieldConfig;
  value: any;
  onChange: (name: string, value: any) => void;
  error?: string;
}

export type CustomRenderFn = (props: {
  field: FormFieldConfig;
  value: any;
  onChange: (name: string, value: any) => void;
  error?: string;
}) => React.ReactNode; 
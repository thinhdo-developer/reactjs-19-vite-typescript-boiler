import { useField } from "formik";
import { AlertCircle } from "lucide-react";
import React from "react";

type TextareaFieldUIProps = {
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  containerClassName?: string;
  leftIcon?: React.ReactNode;
  variant?: "primary" | "primarySmall";
  rows?: number;
  cols?: number;
  value?: string | number | readonly string[] | undefined;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
  error?: string;
  touched?: boolean;
} & Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "value" | "onChange" | "onBlur"
>;

// Base UI component - pure presentation, no hooks
const TextareaFieldUI: React.FC<TextareaFieldUIProps> = ({
  id,
  name,
  label,
  placeholder,
  required = false,
  containerClassName = "",
  leftIcon,
  variant = "primary",
  rows = 4,
  cols = 40,
  value,
  onChange,
  onBlur,
  error,
  touched = false,
  ...props
}) => {
  const isShowError = Boolean(error && touched);

  const baseStyle =
    "w-full rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-base font-normal outline-none transition duration-200 ease-in-out placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50 bg-white focus:ring-opacity-50 focus:ring-offset-0 focus:ring-offset-white";
  const variantStyles = {
    primary:
      "w-full border-gray-200 focus:ring-primary px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 text-base font-normal text-gray-600",
    primarySmall:
      "px-[14px] py-[10px] order-gray-200 focus:ring-primary !text-sm border rounded-lg focus:outline-none focus:ring-1 font-normal text-gray-600",
  };
  const errorStyles = "!border-error focus:!ring-error";

  return (
    <div className={`flex flex-col gap-1 w-full ${containerClassName}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-required ml-1">*</span>}
        </label>
      )}
      <div className="relative w-full">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
            {leftIcon}
          </div>
        )}
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={!!isShowError}
          rows={rows}
          cols={cols}
          className={[
            baseStyle,
            variantStyles[variant],
            leftIcon ? "pl-10" : "",
            isShowError ? errorStyles : "",
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        />
      </div>
      {isShowError && (
        <div className="flex items-center text-error text-sm mt-1">
          <AlertCircle className="w-4 h-4 mr-1" />
          {error}
        </div>
      )}
    </div>
  );
};

// Formik wrapper component
type TextareaFieldFormikProps = Omit<
  TextareaFieldUIProps,
  "value" | "onChange" | "onBlur" | "error" | "touched"
> & {
  name: string; // Required for Formik
};

const TextareaFieldFormik: React.FC<TextareaFieldFormikProps> = ({
  name,
  ...uiProps
}) => {
  const [field, meta] = useField(name);

  return (
    <TextareaFieldUI
      {...uiProps}
      name={name}
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      error={meta.error}
      touched={meta.touched}
    />
  );
};

// Non-Formik wrapper component
type TextareaFieldPlainProps = TextareaFieldUIProps & {
  error?: string;
  touched?: boolean;
};

const TextareaFieldPlain: React.FC<TextareaFieldPlainProps> = ({
  error,
  touched,
  value,
  onChange,
  onBlur,
  ...uiProps
}) => {
  return (
    <TextareaFieldUI
      {...uiProps}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      touched={touched}
    />
  );
};

// Main component with backward compatibility
type TextareaFieldProps = {
  useFormik?: boolean;
} & Partial<TextareaFieldFormikProps> &
  Partial<TextareaFieldPlainProps>;

const TextareaField: React.FC<TextareaFieldProps> = ({
  useFormik = true,
  name,
  ...props
}) => {
  if (useFormik && name) {
    return (
      <TextareaFieldFormik
        name={name}
        {...(props as Omit<TextareaFieldFormikProps, "name">)}
      />
    );
  }

  const { name: plainName, ...plainProps } = props as TextareaFieldPlainProps;
  return <TextareaFieldPlain {...plainProps} name={name || plainName} />;
};

TextareaField.displayName = "TextareaField";

export default TextareaField;
export { TextareaFieldFormik, TextareaFieldPlain, TextareaFieldUI };

import { useField } from "formik";
import { AlertCircle, Eye, EyeClosed, LockIcon } from "lucide-react";
import React, { useState } from "react";

type InputFieldUIProps = {
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  required?: boolean;
  isEncryptField?: boolean;
  containerClassName?: string;
  leftIcon?: React.ReactNode;
  variant?: "primary" | "primarySmall";
  inputClassName?: string;
  renderRightElement?: () => React.ReactNode;
  value?: string | number | readonly string[] | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  error?: string;
  touched?: boolean;
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "onBlur"
>;

// Base UI component - pure presentation, no hooks
const InputFieldUI: React.FC<InputFieldUIProps> = ({
  id,
  name,
  label,
  placeholder,
  type = "text",
  required = false,
  isEncryptField = false,
  containerClassName = "",
  inputClassName = "",
  leftIcon,
  variant = "primary",
  renderRightElement,
  value,
  onChange,
  onBlur,
  error,
  touched = false,
  ...props
}) => {
  const [isShowContent, setIsShowContent] = useState(false);

  const isShowError = Boolean(error && touched);

  let finalType = type;
  if (isEncryptField) {
    finalType = isShowContent ? "text" : "password";
  }

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
        {isEncryptField && (
          <LockIcon className="absolute w-4 left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        )}
        <input
          id={id}
          name={name}
          type={finalType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={!!isShowError}
          className={[
            baseStyle,
            variantStyles[variant],
            isEncryptField || leftIcon ? "pl-10" : "",
            isEncryptField ? "pr-10" : "",
            isShowError ? errorStyles : "",
            inputClassName,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        />
        {isEncryptField && (
          <button
            type="button"
            onClick={() => setIsShowContent((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 focus:outline-none"
            aria-label={isShowContent ? "Hide password" : "Show password"}
          >
            {isShowContent ? (
              <EyeClosed className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        )}
        {renderRightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {renderRightElement()}
          </div>
        )}
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
type InputFieldFormikProps = Omit<
  InputFieldUIProps,
  "value" | "onChange" | "onBlur" | "error" | "touched"
> & {
  name: string; // Required for Formik
};

const InputFieldFormik: React.FC<InputFieldFormikProps> = ({
  name,
  ...uiProps
}) => {
  const [field, meta] = useField(name);

  return (
    <InputFieldUI
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
type InputFieldPlainProps = InputFieldUIProps & {
  error?: string;
  touched?: boolean;
};

const InputFieldPlain: React.FC<InputFieldPlainProps> = ({
  error,
  touched,
  value,
  onChange,
  onBlur,
  ...uiProps
}) => {
  return (
    <InputFieldUI
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
type InputFieldProps = {
  useFormik?: boolean;
} & Partial<InputFieldFormikProps> &
  Partial<InputFieldPlainProps>;

const InputField: React.FC<InputFieldProps> = ({
  useFormik = true,
  name,
  ...props
}) => {
  if (useFormik && name) {
    return (
      <InputFieldFormik
        name={name}
        {...(props as Omit<InputFieldFormikProps, "name">)}
      />
    );
  }

  const { name: plainName, ...plainProps } = props as InputFieldPlainProps;
  return <InputFieldPlain {...plainProps} name={name || plainName} />;
};

export default InputField;
export { InputFieldFormik, InputFieldPlain, InputFieldUI };

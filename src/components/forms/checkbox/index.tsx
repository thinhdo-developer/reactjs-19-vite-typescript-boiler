import { useField } from "formik";
import { AlertCircle, CheckIcon } from "lucide-react";
import React from "react";

type CheckboxFieldUIProps = {
  id?: string;
  name?: string;
  label?: string;
  required?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  error?: string;
  touched?: boolean;
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "onBlur" | "checked" | "type"
>;

// Base UI component - pure presentation, no hooks
const CheckboxFieldUI: React.FC<CheckboxFieldUIProps> = ({
  id,
  name,
  label,
  required = false,
  containerClassName = "",
  labelClassName = "",
  checked = false,
  onChange,
  onBlur,
  error,
  touched = false,
  ...props
}) => {
  const isShowError = Boolean(error && touched);

  const handleToggle = () => {
    if (onChange) {
      const syntheticEvent = {
        target: {
          name: name ?? "",
          checked: !checked,
          type: "checkbox",
        },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
  };

  return (
    <div className={`flex items-center gap-2 ${containerClassName}`}>
      <input
        id={id}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        onBlur={onBlur}
        className="hidden"
        aria-invalid={!!isShowError}
        {...props}
      />

      <button
        type="button"
        onClick={handleToggle}
        className={[
          "w-5 h-5 border-[1px] border-gray-300 rounded-md",
          checked ? "bg-primary" : "bg-white",
          "flex items-center justify-center cursor-pointer",
          isShowError ? "border-error" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-pressed={checked}
      >
        {checked && <CheckIcon className="w-4 h-4 text-white" />}
      </button>

      {label && (
        <label
          htmlFor={id}
          className={`text-sm text-gray-700 cursor-pointer ${labelClassName}`}
        >
          {label}
          {required && <span className="text-required ml-1">*</span>}
        </label>
      )}

      {isShowError && (
        <div className="flex items-center text-error text-sm ml-2">
          <AlertCircle className="w-4 h-4 mr-1" />
          {error}
        </div>
      )}
    </div>
  );
};

// Formik wrapper component
type CheckboxFieldFormikProps = Omit<
  CheckboxFieldUIProps,
  "checked" | "onChange" | "onBlur" | "error" | "touched"
> & {
  name: string; // Required for Formik
};

const CheckboxFieldFormik: React.FC<CheckboxFieldFormikProps> = ({
  name,
  ...uiProps
}) => {
  const [field, meta] = useField({ name, type: "checkbox" });

  return (
    <CheckboxFieldUI
      {...uiProps}
      name={name}
      checked={field.checked}
      onChange={field.onChange}
      onBlur={field.onBlur}
      error={meta.error}
      touched={meta.touched}
    />
  );
};

// Non-Formik wrapper component
type CheckboxFieldPlainProps = CheckboxFieldUIProps & {
  error?: string;
  touched?: boolean;
};

const CheckboxFieldPlain: React.FC<CheckboxFieldPlainProps> = ({
  error,
  touched,
  checked,
  onChange,
  onBlur,
  ...uiProps
}) => {
  return (
    <CheckboxFieldUI
      {...uiProps}
      checked={checked}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      touched={touched}
    />
  );
};

// Main component with backward compatibility
type CheckboxFieldProps = {
  useFormik?: boolean;
} & Partial<CheckboxFieldFormikProps> &
  Partial<CheckboxFieldPlainProps>;

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  useFormik = true,
  name,
  ...props
}) => {
  if (useFormik && name) {
    return (
      <CheckboxFieldFormik
        name={name}
        {...(props as Omit<CheckboxFieldFormikProps, "name">)}
      />
    );
  }

  const { name: plainName, ...plainProps } = props as CheckboxFieldPlainProps;
  return <CheckboxFieldPlain {...plainProps} name={name || plainName} />;
};

export default CheckboxField;
export { CheckboxFieldFormik, CheckboxFieldPlain, CheckboxFieldUI };

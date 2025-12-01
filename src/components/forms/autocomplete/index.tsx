/* eslint-disable @typescript-eslint/no-unused-vars */
import { useField } from "formik";
import React from "react";
import Select, { GroupProps, components } from "react-select";

type OptionType = {
  value: string;
  label: string;
};

const Group = (props: GroupProps<any, any>) => (
  <div>
    <components.Group {...props} />
  </div>
);

type AutoCompleteUIProps<T> = {
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  containerClassName?: string;
  options: T[];
  variant?: "primary" | "secondary" | "tertiary";
  isHideLabel?: boolean;
  value?: string | undefined | null;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  customRenderOption?: (option: T) => React.ReactNode;
  customRenderSelected?: (selected: T) => React.ReactNode;
  controlClassName?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  error?: string;
  touched?: boolean;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "onBlur">;

// Base UI component - pure presentation, no hooks
const AutoCompleteUI = <T extends OptionType>({
  id,
  name,
  label,
  placeholder,
  required = false,
  containerClassName = "",
  options,
  variant = "primary",
  isHideLabel = false,
  value,
  onChange,
  onBlur,
  controlClassName = "",
  customRenderOption,
  customRenderSelected,
  isLoading = false,
  isDisabled = false,
  error,
  touched = false,
  ...props
}: AutoCompleteUIProps<T>) => {
  const baseStyle =
    "relative !min-h-fit  rounded-lg !cursor-pointer focus:outline-none  focus:ring-2 focus:border-transparent text-sm font-normal outline-none transition duration-200 ease-in-out placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50 bg-white dark:bg-gray-800 dark:text-gray-200 dark:placeholder:text-gray-500 dark:border-gray-700 focus:ring-opacity-50 focus:ring-offset-0 focus:ring-offset-white dark:focus:ring-offset-gray-800";

  const variantStyles = {
    primary:
      "w-full min-w-[152px] !border-gray-200  px-3 py-2 border !rounded-lg focus:outline-none focus:!ring-1 text-sm font-medium text-body",
    secondary:
      "px-[14px] py-[10px] border border-gray-200 !rounded-lg focus:ring-secondary text-gray-600 bg-gray-50",
    tertiary:
      "px-[14px] py-[10px] !bg-primary border border-gray-200 !rounded-lg focus:ring-secondary !text-white",
  };

  const isShowError = Boolean(error && touched);

  // Find the selected option based on value
  const selectedOption = options.find((opt) => opt.value === value) || null;

  const handleChange = (selected: any) => {
    onChange?.(selected?.value ?? "");
  };

  return (
    <div className={`flex flex-col gap-1 ${containerClassName}`}>
      {label && (
        <label
          htmlFor={id}
          className={`text-sm font-medium text-gray-700 ${
            isHideLabel ? "invisible" : ""
          }`}
        >
          {label}
          {required && <span className="text-required ml-1">*</span>}
        </label>
      )}
      <Select<any, false>
        id={id}
        name={name}
        instanceId={id}
        options={options as OptionType[]}
        value={selectedOption}
        isSearchable
        onChange={handleChange}
        onBlur={onBlur}
        placeholder={placeholder}
        menuPlacement="auto"
        styles={{
          control: (base, state) => ({
            ...base,
            boxShadow: "none",
            borderColor: isShowError
              ? "#ef4444"
              : state.isFocused
              ? "#3b82f6"
              : base.borderColor,
          }),
          menu: (base) => ({
            ...base,
            zIndex: 9999,
          }),
          menuPortal: (base) => ({
            ...base,
            zIndex: 9999,
          }),
          container: (base) => ({
            ...base,
          }),
        }}
        menuPosition="fixed"
        classNames={{
          control: ({ isFocused }) => {
            const isFocousedStyle = isFocused ? "!border-primary" : "";
            const errorStyle = isShowError ? "!border-error" : "";
            return [
              baseStyle,
              variantStyles[variant],
              isFocousedStyle,
              errorStyle,
              controlClassName,
            ]
              .filter(Boolean)
              .join(" ");
          },
          container: () => "w-full p-0 ",
          input: () => "text-sm font-medium text-body !m-0 !p-0 ",
          indicatorsContainer: () => "text-gray-500 p-0",
          indicatorSeparator: () => "hidden",
          dropdownIndicator: () => "text-gray-500 !p-0",
          valueContainer: () =>
            "text-sm font-medium text-body !m-0 !p-0 !flex bg-transparent ",
        }}
        components={{
          Group,
        }}
        classNamePrefix="react-select"
        isLoading={isLoading}
        isDisabled={isDisabled}
        {...props}
      />
      {isShowError && (
        <div className="flex items-center text-error text-sm mt-1">
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

// Formik wrapper component
type AutoCompleteFormikProps<T> = Omit<
  AutoCompleteUIProps<T>,
  "value" | "onChange" | "onBlur" | "error" | "touched"
> & {
  name: string; // Required for Formik
};

const AutoCompleteFormik = <T extends OptionType>({
  name,
  ...uiProps
}: AutoCompleteFormikProps<T>) => {
  const [field, meta] = useField(name);

  const handleChange = (value: string) => {
    field.onChange({
      target: {
        name,
        value,
      },
    });
  };

  const handleBlur = () => {
    field.onBlur({
      target: {
        name,
      },
    });
  };

  return (
    <AutoCompleteUI<T>
      {...(uiProps as Omit<
        AutoCompleteUIProps<T>,
        "value" | "onChange" | "onBlur" | "error" | "touched" | "name"
      >)}
      name={name}
      value={field.value}
      onChange={handleChange}
      onBlur={handleBlur}
      error={meta.error}
      touched={meta.touched}
    />
  );
};

// Non-Formik wrapper component
type AutoCompletePlainProps<T> = AutoCompleteUIProps<T> & {
  error?: string;
  touched?: boolean;
};

const AutoCompletePlain = <T extends OptionType>({
  error,
  touched,
  value,
  onChange,
  onBlur,
  ...uiProps
}: AutoCompletePlainProps<T>) => {
  return (
    <AutoCompleteUI
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
type AutoCompleteProps<T> = {
  useFormik?: boolean;
} & Partial<AutoCompleteFormikProps<T>> &
  Partial<AutoCompletePlainProps<T>>;

const AutoComplete = <T extends OptionType>({
  useFormik = true,
  name,
  ...props
}: AutoCompleteProps<T>) => {
  if (useFormik && name) {
    return (
      <AutoCompleteFormik
        name={name}
        {...(props as Omit<AutoCompleteFormikProps<T>, "name">)}
      />
    );
  }

  const { name: plainName, ...plainProps } = props as AutoCompletePlainProps<T>;
  return <AutoCompletePlain {...plainProps} name={name || plainName} />;
};

AutoComplete.displayName = "AutoComplete";

export default AutoComplete;
export { AutoCompleteFormik, AutoCompletePlain, AutoCompleteUI };

import { useField } from "formik";
import { AlertCircle } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

export type OtpInputFieldProps = {
  name: string; // Required for Formik
  length?: number;
  label?: string;
  required?: boolean;
  containerClassName?: string;
  inputClassName?: string;
  error?: string;
  touched?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
  "data-testid"?: string;
  onComplete?: (otp: string) => void;
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "onBlur" | "type" | "maxLength"
>;

// Base UI component - pure presentation
const OtpInputFieldUI: React.FC<
  OtpInputFieldProps & {
    value: string;
    onChange: (value: string) => void;
    onBlur: () => void;
  }
> = ({
  name,
  length = 4,
  label,
  required = false,
  containerClassName = "",
  inputClassName = "",
  error,
  touched = false,
  autoFocus = false,
  disabled = false,
  "data-testid": dataTestId,
  value,
  onChange,
  onBlur,
  onComplete,
  ...props
}) => {
  const [otp, setOtp] = useState<string[]>(() => {
    if (value) {
      return value.split("").slice(0, length);
    }
    return Array(length).fill("");
  });

  const inputsRef = useRef<HTMLInputElement[]>([]);

  const isShowError = Boolean(error && touched);

  const handleChange = (inputValue: string, index: number) => {
    const numericValue = inputValue.replace(/\D/g, "");

    if (numericValue.length > 1) {
      const newOtp = [...otp];
      numericValue.split("").forEach((char, i) => {
        if (index + i < length) {
          newOtp[index + i] = char;
          if (inputsRef.current[index + i]) {
            inputsRef.current[index + i].value = char;
          }
        }
      });
      setOtp(newOtp);
      const otpString = newOtp.join("");
      onChange(otpString);

      const nextIndex = Math.min(index + numericValue.length, length - 1);
      inputsRef.current[nextIndex]?.focus();

      // Trigger onComplete if all fields are filled
      if (newOtp.every((digit) => digit !== "")) {
        onComplete?.(otpString);
      }
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = numericValue;
    setOtp(newOtp);

    const otpString = newOtp.join("");
    onChange(otpString);

    if (numericValue.length === 1 && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    if (newOtp.every((digit) => digit !== "")) {
      onComplete?.(otpString);
    }
  };

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    index: number
  ) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);

    if (!pastedData) return;

    const newOtp = Array(length).fill("");
    pastedData.split("").forEach((char, i) => {
      if (index + i < length) {
        newOtp[index + i] = char;
        if (inputsRef.current[index + i]) {
          inputsRef.current[index + i].value = char;
        }
      }
    });

    setOtp(newOtp);
    const otpString = newOtp.join("");
    onChange(otpString);

    // Focus next empty input or last input
    const nextIndex = Math.min(index + pastedData.length, length - 1);
    inputsRef.current[nextIndex]?.focus();

    // Trigger onComplete if all fields are filled
    if (newOtp.every((digit) => digit !== "")) {
      onComplete?.(otpString);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    // Handle backspace
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        // If current field is empty, focus previous and clear it
        inputsRef.current[index - 1]?.focus();
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        onChange(newOtp.join(""));
      } else if (otp[index]) {
        // If current field has value, clear it
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
        onChange(newOtp.join(""));
      }
    }

    // Handle arrow keys
    if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    // Handle delete
    if (e.key === "Delete" && otp[index]) {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      onChange(newOtp.join(""));
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    // Select all text on focus for easy replacement
    e.target.select();
  };

  useEffect(() => {
    if (autoFocus && inputsRef.current[0]) {
      inputsRef.current[0].focus();
    }
  }, [autoFocus]);

  return (
    <div
      className={`flex flex-col gap-2 w-full ${containerClassName}`}
      data-testid={dataTestId}
    >
      {label && (
        <label
          htmlFor={`${name}-0`}
          className="text-sm font-medium text-gray-700"
        >
          {label}
          {required && <span className="text-required ml-1">*</span>}
        </label>
      )}

      <div className="flex justify-between gap-2 w-full">
        {otp.map((digit, index) => (
          <input
            key={`${name}-${index}`}
            id={`${name}-${index}`}
            name={`${name}-${index}`}
            type="text"
            inputMode="numeric"
            maxLength={1}
            ref={(el) => {
              if (el) {
                inputsRef.current[index] = el;
              }
            }}
            value={digit}
            disabled={disabled}
            onChange={(e) => handleChange(e.target.value, index)}
            onBlur={onBlur}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={(e) => handlePaste(e, index)}
            onFocus={handleFocus}
            aria-label={`OTP digit ${index + 1} of ${length}`}
            aria-invalid={!!isShowError}
            className={`
              w-16 h-16 text-center text-2xl sm:text-3xl
              bg-white border rounded-lg
              focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
              transition-all duration-200
              font-mono tracking-widest
              disabled:bg-gray-50 disabled:cursor-not-allowed
              ${
                digit === ""
                  ? "border-gray-300 text-gray-400"
                  : "border-primary border-2 text-primary font-semibold"
              }
              ${
                isShowError
                  ? "border-error! border-2 text-error! focus:ring-error!"
                  : ""
              }
              ${inputClassName}
            `}
            placeholder="0"
            {...props}
          />
        ))}
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
type OtpInputFieldFormikProps = Omit<
  OtpInputFieldProps,
  "value" | "onChange" | "onBlur" | "error" | "touched"
> & {
  name: string; // Required for Formik
};

const OtpInputFieldFormik: React.FC<OtpInputFieldFormikProps> = ({
  name,
  onComplete,
  ...uiProps
}) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (value: string) => {
    helpers.setValue(value);
    helpers.setTouched(true);
  };

  const handleBlur = () => {
    helpers.setTouched(true);
  };

  const handleComplete = (otp: string) => {
    onComplete?.(otp);
  };

  return (
    <OtpInputFieldUI
      {...uiProps}
      name={name}
      value={field.value || ""}
      onChange={handleChange}
      onBlur={handleBlur}
      error={meta.error}
      touched={meta.touched}
      onComplete={handleComplete}
    />
  );
};

// Non-Formik wrapper component
type OtpInputFieldPlainProps = OtpInputFieldProps & {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  touched?: boolean;
};

const OtpInputFieldPlain: React.FC<OtpInputFieldPlainProps> = ({
  value = "",
  onChange,
  onBlur,
  error,
  touched,
  ...uiProps
}) => {
  const handleChange = (newValue: string) => {
    onChange?.(newValue);
  };

  const handleBlur = () => {
    onBlur?.();
  };

  return (
    <OtpInputFieldUI
      {...uiProps}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      error={error}
      touched={touched}
    />
  );
};

// Main component with backward compatibility
type OtpInputFieldComponentProps = {
  useFormik?: boolean;
} & Partial<OtpInputFieldFormikProps> &
  Partial<OtpInputFieldPlainProps>;

const OtpInputField: React.FC<OtpInputFieldComponentProps> = ({
  useFormik = true,
  name,
  ...props
}) => {
  if (useFormik && name) {
    return (
      <OtpInputFieldFormik
        name={name}
        {...(props as Omit<OtpInputFieldFormikProps, "name">)}
      />
    );
  }

  return (
    <OtpInputFieldPlain
      {...(props as OtpInputFieldPlainProps)}
      name={name || "otp"}
    />
  );
};

OtpInputField.displayName = "OtpInputField";

export default OtpInputField;
export { OtpInputFieldFormik, OtpInputFieldPlain, OtpInputFieldUI };

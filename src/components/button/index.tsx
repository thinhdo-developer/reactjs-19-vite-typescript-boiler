/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { forwardRef, ReactNode } from "react";
import { NavLink, NavLinkProps } from "react-router-dom";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "link-tertiary"
  | "danger";

export type ButtonSize = "sm" | "md" | "lg";

type BaseButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  className?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  tooltip?: string;
  "aria-label"?: string;
  "data-testid"?: string;
  iconOnly?: boolean;
};

type ButtonAsButton = BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> & {
    href?: never;
    to?: never;
  };

type ButtonAsLink = BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps> & {
    href: string;
    to?: never;
    disabled?: never;
    target?: string;
    rel?: string;
  };

type ButtonAsNavLink = BaseButtonProps &
  Omit<NavLinkProps, keyof BaseButtonProps> & {
    to: string;
    href?: never;
    disabled?: never;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsNavLink;

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (props, ref) => {
    const {
      children,
      variant = "primary",
      size = "md",
      fullWidth = false,
      isLoading = false,
      loadingText,
      className = "",
      href,
      disabled,
      to,
      leftIcon,
      rightIcon,
      tooltip,
      "aria-label": ariaLabel,
      "data-testid": dataTestId,
      iconOnly = false,
      ...restProps
    } = props;

    // Extract anchor-specific props
    const target = "target" in restProps ? restProps.target : undefined;
    const rel = "rel" in restProps ? restProps.rel : undefined;

    const baseStyles =
      "inline-flex items-center justify-center border rounded-lg font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none";

    const sizeStyles: Record<ButtonSize, string> = {
      sm: iconOnly ? "p-1.5" : "py-1.5 px-3 text-xs",
      md: iconOnly ? "p-2" : "py-2 px-4 text-sm",
      lg: iconOnly ? "p-2.5" : "py-2.5 px-6 text-base",
    };

    const variants: Record<ButtonVariant, string> = {
      primary:
        "md:min-w-[178px] border-transparent text-white bg-primary hover:bg-opacity-90 active:bg-opacity-80 shadow-sm cursor-pointer",
      secondary:
        "text-heading bg-white border border-gray-300 hover:bg-gray-50 active:bg-gray-100",
      outline:
        "text-heading bg-white border border-gray-300 hover:bg-gray-50 active:bg-gray-100 shadow-sm",
      "link-tertiary":
        "text-tertiary font-semibold ml-3 underline hover:opacity-80 active:opacity-70 border-none px-0 py-0",
      danger:
        "text-white bg-danger border border-danger hover:bg-opacity-90 active:bg-opacity-80 shadow-sm",
    };

    const spinnerColors: Record<ButtonVariant, string> = {
      primary: "text-white",
      secondary: "text-heading",
      outline: "text-heading",
      "link-tertiary": "text-tertiary",
      danger: "text-white",
    };

    const spinnerSizes: Record<ButtonSize, string> = {
      sm: "h-3.5 w-3.5",
      md: "h-4 w-4",
      lg: "h-5 w-5",
    };

    const isDisabled = disabled || isLoading;
    const disabledStyles = isDisabled ? "opacity-50 cursor-not-allowed" : "";
    const width = fullWidth ? "w-full" : "";
    const spinnerColor = spinnerColors[variant] || "text-white";
    const spinnerSize = spinnerSizes[size] || "h-4 w-4";

    const spinner = (
      <svg
        className={`animate-spin ${spinnerSize} ${spinnerColor}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        role="status"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4zm2 5.3A8 8 0 014 12H0c0 3.04 1.13 5.82 3 7.94l3-2.64z"
        />
      </svg>
    );

    const finalClass = [
      baseStyles,
      sizeStyles[size],
      variants[variant],
      width,
      className,
      disabledStyles,
    ]
      .filter(Boolean)
      .join(" ");

    const renderContent = () => {
      if (iconOnly && !leftIcon && !rightIcon && !isLoading) {
        return <>{children}</>;
      }

      return (
        <span className="inline-flex items-center gap-2">
          {leftIcon && !isLoading && <span>{leftIcon}</span>}
          {isLoading ? (
            <>
              {spinner}
              {loadingText && <span>{loadingText}</span>}
            </>
          ) : (
            <>{children}</>
          )}
          {rightIcon && !isLoading && <span>{rightIcon}</span>}
        </span>
      );
    };

    const commonProps = {
      className: finalClass,
      "aria-label":
        ariaLabel ||
        (iconOnly && typeof children === "string" ? children : undefined),
      "aria-busy": isLoading,
      "aria-disabled": isDisabled,
      "data-testid": dataTestId,
      title: tooltip,
      ref: ref as any,
    };

    // Filter out button-specific props for links
    const filterButtonProps = (props: any) => {
      const {
        disabled,
        type,
        form,
        formAction,
        formEncType,
        formMethod,
        formNoValidate,
        formTarget,
        target,
        rel,
        ...rest
      } = props;
      return rest;
    };

    if (to) {
      const navLinkProps = filterButtonProps(restProps);
      return (
        <NavLink
          to={isDisabled ? "#" : to}
          onClick={(e) => {
            if (isDisabled) {
              e.preventDefault();
              return;
            }
            if (restProps.onClick) {
              (restProps.onClick as any)(e);
            }
          }}
          {...commonProps}
          {...navLinkProps}
        >
          {renderContent()}
        </NavLink>
      );
    }

    if (href) {
      const isExternal = target === "_blank";
      const anchorProps = filterButtonProps(restProps);
      return (
        <a
          href={isDisabled ? undefined : href}
          target={target}
          rel={isExternal ? "noopener noreferrer" : rel}
          onClick={(e) => {
            if (isDisabled) {
              e.preventDefault();
              return;
            }
            if (restProps.onClick) {
              (restProps.onClick as any)(e);
            }
          }}
          {...commonProps}
          {...anchorProps}
        >
          {renderContent()}
        </a>
      );
    }

    const buttonProps =
      restProps as React.ButtonHTMLAttributes<HTMLButtonElement>;
    return (
      <button
        type={buttonProps.type || "button"}
        disabled={isDisabled}
        {...commonProps}
        {...buttonProps}
      >
        {renderContent()}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;

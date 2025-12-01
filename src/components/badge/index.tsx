import React, { ReactNode } from "react";

export type BadgeVariant = "primary" | "secondary" | "success" | "warning" | "danger" | "info";
export type BadgeSize = "sm" | "md" | "lg";

export type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  rounded?: boolean;
  className?: string;
  "data-testid"?: string;
};

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "primary",
  size = "md",
  rounded = false,
  className = "",
  "data-testid": dataTestId,
}) => {
  const variantClasses: Record<BadgeVariant, string> = {
    primary: "bg-primary text-white",
    secondary: "bg-gray-500 text-white",
    success: "bg-green-500 text-white",
    warning: "bg-yellow-500 text-white",
    danger: "bg-red-500 text-white",
    info: "bg-blue-500 text-white",
  };

  const sizeClasses: Record<BadgeSize, string> = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-1",
    lg: "text-base px-3 py-1.5",
  };

  const baseClasses = `
    inline-flex items-center justify-center font-medium
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${rounded ? "rounded-full" : "rounded"}
    ${className}
  `;

  return (
    <span className={baseClasses} data-testid={dataTestId}>
      {children}
    </span>
  );
};

export default Badge;


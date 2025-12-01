import React, { ReactNode } from "react";

export type CardProps = {
  children: ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
  shadow?: "none" | "sm" | "md" | "lg";
  rounded?: "none" | "sm" | "md" | "lg" | "xl";
  bordered?: boolean;
  hover?: boolean;
  onClick?: () => void;
  "data-testid"?: string;
};

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  padding = "md",
  shadow = "sm",
  rounded = "md",
  bordered = true,
  hover = false,
  onClick,
  "data-testid": dataTestId,
}) => {
  const paddingClasses = {
    none: "",
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  };

  const shadowClasses = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
  };

  const roundedClasses = {
    none: "",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
  };

  const baseClasses = `
    bg-white
    ${bordered ? "border border-gray-200" : ""}
    ${paddingClasses[padding]}
    ${shadowClasses[shadow]}
    ${roundedClasses[rounded]}
    ${hover ? "transition-shadow hover:shadow-md cursor-pointer" : ""}
    ${onClick ? "cursor-pointer" : ""}
    ${className}
  `;

  return (
    <div
      className={baseClasses}
      onClick={onClick}
      data-testid={dataTestId}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {children}
    </div>
  );
};

export default Card;


import React from "react";

export type DividerProps = {
  orientation?: "horizontal" | "vertical";
  spacing?: "sm" | "md" | "lg";
  className?: string;
  "data-testid"?: string;
};

const Divider: React.FC<DividerProps> = ({
  orientation = "horizontal",
  spacing = "md",
  className = "",
  "data-testid": dataTestId,
}) => {
  const spacingClasses = {
    sm: orientation === "horizontal" ? "my-2" : "mx-2",
    md: orientation === "horizontal" ? "my-4" : "mx-4",
    lg: orientation === "horizontal" ? "my-6" : "mx-6",
  };

  const baseClasses = `
    bg-gray-200
    ${orientation === "horizontal" ? "w-full h-px" : "h-full w-px"}
    ${spacingClasses[spacing]}
    ${className}
  `;

  return <div className={baseClasses} data-testid={dataTestId} role="separator" />;
};

export default Divider;


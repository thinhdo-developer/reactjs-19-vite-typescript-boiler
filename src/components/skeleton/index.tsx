import React from "react";

export type SkeletonProps = {
  width?: string | number;
  height?: string | number;
  rounded?: boolean;
  className?: string;
  "data-testid"?: string;
};

const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  rounded = false,
  className = "",
  "data-testid": dataTestId,
}) => {
  const style: React.CSSProperties = {
    width: width ? (typeof width === "number" ? `${width}px` : width) : "100%",
    height: height ? (typeof height === "number" ? `${height}px` : height) : "1rem",
  };

  const baseClasses = `
    bg-gray-200 animate-pulse
    ${rounded ? "rounded-full" : "rounded"}
    ${className}
  `;

  return (
    <div
      className={baseClasses}
      style={style}
      data-testid={dataTestId}
      aria-busy="true"
      aria-label="Loading"
    />
  );
};

export default Skeleton;


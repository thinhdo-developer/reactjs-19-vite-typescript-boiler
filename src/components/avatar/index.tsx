import React from "react";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

export type AvatarProps = {
  src?: string;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  rounded?: boolean;
  className?: string;
  "data-testid"?: string;
  onClick?: () => void;
};

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name,
  size = "md",
  rounded = true,
  className = "",
  "data-testid": dataTestId,
  onClick,
}) => {
  const sizeClasses: Record<AvatarSize, string> = {
    xs: "w-6 h-6 text-xs",
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
    xl: "w-16 h-16 text-xl",
  };

  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const baseClasses = `
    inline-flex items-center justify-center
    bg-gray-300 text-gray-700 font-medium
    ${sizeClasses[size]}
    ${rounded ? "rounded-full" : "rounded"}
    ${onClick ? "cursor-pointer hover:opacity-80 transition-opacity" : ""}
    ${className}
  `;

  if (src) {
    return (
      <img
        src={src}
        alt={alt || name || "Avatar"}
        className={baseClasses}
        data-testid={dataTestId}
        onClick={onClick}
        onError={(e) => {
          // Fallback to initials if image fails to load
          const target = e.target as HTMLImageElement;
          target.style.display = "none";
          const parent = target.parentElement;
          if (parent && name) {
            parent.innerHTML = `<span class="${baseClasses}">${getInitials(name)}</span>`;
          }
        }}
      />
    );
  }

  if (name) {
    return (
      <div className={baseClasses} data-testid={dataTestId} onClick={onClick}>
        {getInitials(name)}
      </div>
    );
  }

  return (
    <div className={baseClasses} data-testid={dataTestId} onClick={onClick}>
      <svg
        className="w-full h-full text-gray-400"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};

export default Avatar;


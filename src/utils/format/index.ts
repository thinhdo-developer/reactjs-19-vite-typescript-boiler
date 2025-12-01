/**
 * Formatting utility functions
 */

/**
 * Formats a number with thousand separators
 */
export const formatNumber = (
  value: number | string,
  decimals: number = 0
): string => {
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num)) return "0";

  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
};

/**
 * Formats a number as currency
 */
export const formatCurrency = (
  value: number | string,
  currency: string = "USD",
  locale: string = "en-US"
): string => {
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num)) return "0";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(num);
};

/**
 * Formats a number as percentage
 */
export const formatPercentage = (
  value: number | string,
  decimals: number = 2
): string => {
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num)) return "0%";

  return `${num.toFixed(decimals)}%`;
};

/**
 * Truncates a string to a specified length
 */
export const truncate = (str: string, length: number, suffix: string = "..."): string => {
  if (str.length <= length) return str;
  return str.slice(0, length) + suffix;
};

/**
 * Capitalizes the first letter of a string
 */
export const capitalize = (str: string): string => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Converts a string to title case
 */
export const toTitleCase = (str: string): string => {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

/**
 * Formats file size in bytes to human readable format
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
};

/**
 * Formats a phone number
 */
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
};

/**
 * Masks sensitive information (like credit card, SSN)
 */
export const maskString = (
  str: string,
  start: number = 0,
  end: number = 4,
  maskChar: string = "*"
): string => {
  if (str.length <= start + end) return maskChar.repeat(str.length);
  const visible = str.slice(0, start) + str.slice(-end);
  const masked = maskChar.repeat(str.length - start - end);
  return visible.slice(0, start) + masked + visible.slice(-end);
};

/**
 * Converts camelCase to kebab-case
 */
export const camelToKebab = (str: string): string => {
  return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
};

/**
 * Converts kebab-case to camelCase
 */
export const kebabToCamel = (str: string): string => {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
};


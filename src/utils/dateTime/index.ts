import { DATE_FORMAT } from "@configs/dateTime";
import { format } from "date-fns"; // Optional: You can use date-fns or moment.js

/**
 * Formats a given date according to the specified format string.
 *
 * @param date - The date to be formatted.
 * @param formatString - The format string to use for formatting the date. Defaults to `DATE_FORMAT.ISO`.
 * @returns The formatted date string.
 */
export const formatDate = (date: Date, formatString: string = DATE_FORMAT.ISO): string => {
  return format(date, formatString);
};

/**
 * Returns the current date formatted according to the specified format string.
 *
 * @param formatString - The format string to use for formatting the date. Defaults to `DATE_FORMAT.ISO`.
 * @returns The formatted current date string.
 */
export const getCurrentDateFormatted = (formatString: string = DATE_FORMAT.ISO): string => {
  const currentDate = new Date();
  return format(currentDate, formatString);
};

/**
 * Returns the current date and time formatted according to the specified format string.
 *
 * @param formatString - The format string to use for formatting the date. Defaults to `DATE_FORMAT.FULL`.
 * @returns The formatted current date and time string.
 */
export const getCurrentDateTime = (): string => {
  return format(new Date(), DATE_FORMAT.FULL);
};

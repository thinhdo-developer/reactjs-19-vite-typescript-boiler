import { describe, it, expect } from "vitest";
import { formatDate, getCurrentDateFormatted, getCurrentDateTime } from "@utils/dateTime";
import { DATE_FORMAT } from "@configs/dateTime";
import { format } from "date-fns";

describe("dateTime utils", () => {
  describe("formatDate", () => {
    it("should format the date according to the specified format string", () => {
      const date = new Date("2023-01-01T00:00:00Z");
      const formatString = "yyyy-MM-dd";
      const formattedDate = formatDate(date, formatString);
      expect(formattedDate).toBe("2023-01-01");
    });

    it("should use the default format string if none is provided", () => {
      const date = new Date("2023-01-01T00:00:00Z");
      const formattedDate = formatDate(date);
      expect(formattedDate).toBe(format(date, DATE_FORMAT.ISO));
    });
  });

  describe("getCurrentDateFormatted", () => {
    it("should return the current date formatted according to the specified format string", () => {
      const formatString = "yyyy-MM-dd";
      const currentDate = new Date();
      const formattedDate = getCurrentDateFormatted(formatString);
      expect(formattedDate).toBe(format(currentDate, formatString));
    });

    it("should use the default format string if none is provided", () => {
      const currentDate = new Date();
      const formattedDate = getCurrentDateFormatted();
      expect(formattedDate).toBe(format(currentDate, DATE_FORMAT.ISO));
    });
  });

  describe("getCurrentDateTime", () => {
    it("should return the current date and time formatted according to the default format string", () => {
      const currentDateTime = new Date();
      const formattedDateTime = getCurrentDateTime();
      expect(formattedDateTime).toBe(format(currentDateTime, DATE_FORMAT.FULL));
    });
  });
});

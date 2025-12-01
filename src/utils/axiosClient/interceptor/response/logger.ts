import { APP_ENV } from "@configs/env";
import { type AxiosResponse } from "axios";

/**
 * Logs response information in development mode
 */
export const logResponse = (response: AxiosResponse): void => {
  if (APP_ENV === "development") {
    const { config, status, statusText, data } = response;
    const { method, url, baseURL } = config;
    const requestId = config.headers?.["X-Request-ID"] || "N/A";

    console.group(
      `✅ [${method?.toUpperCase()}] ${url || baseURL} - ${status} ${statusText}`
    );
    console.log("Request ID:", requestId);
    console.log("Status:", status);
    console.log("Data:", data);
    console.groupEnd();
  }
};

/**
 * Logs error response in development mode
 */
export const logError = (error: any): void => {
  if (APP_ENV === "development") {
    const config = error.config || {};
    const { method, url, baseURL } = config;
    const requestId = config.headers?.["X-Request-ID"] || "N/A";
    const status = error.response?.status || "N/A";
    const statusText = error.response?.statusText || error.message || "N/A";
    const data = error.response?.data || error.message;

    console.group(
      `❌ [${method?.toUpperCase() || "REQUEST"}] ${url || baseURL || "Unknown"} - ${status} ${statusText}`
    );
    console.log("Request ID:", requestId);
    console.log("Status:", status);
    console.log("Error Data:", data);
    if (error.stack) console.log("Stack:", error.stack);
    console.groupEnd();
  }
};


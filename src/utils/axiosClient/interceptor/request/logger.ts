import { APP_ENV } from "@configs/env";
import { type InternalAxiosRequestConfig } from "axios";

/**
 * Logs request information in development mode
 */
export const logRequest = (config: InternalAxiosRequestConfig): void => {
  if (APP_ENV === "development") {
    const { method, url, baseURL, headers, params, data } = config;
    const requestId = config.headers?.["X-Request-ID"] || "N/A";

    console.group(`🚀 [${method?.toUpperCase()}] ${url || baseURL}`);
    console.log("Request ID:", requestId);
    console.log("URL:", `${baseURL}${url}`);
    if (params) console.log("Params:", params);
    if (data) console.log("Data:", data);
    console.log("Headers:", {
      ...headers,
      Authorization: headers.Authorization ? "Bearer ***" : undefined,
    });
    console.groupEnd();
  }
};

/**
 * Generates a unique request ID
 */
export const generateRequestId = (): string => {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};


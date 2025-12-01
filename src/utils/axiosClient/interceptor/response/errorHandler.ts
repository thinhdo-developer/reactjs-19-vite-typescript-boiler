import { PATHS } from "@/routes/paths";
import { showErrorToast } from "@/utils/toast";
import type { AxiosError, AxiosRequestConfig } from "axios";
import { HttpStatusCode } from "axios";
import { logError } from "./logger";
import { fetchRefreshToken, logOut, retryRequest } from "./retryService";

interface RetryQueueItem {
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
  axiosConfig: AxiosRequestConfig;
}

// Create a list to hold the request queue
const refreshAndRetryQueue: RetryQueueItem[] = [];

// Flag to prevent multiple token refresh requests
let isRefreshing = false;

const clearQueue = () => {
  refreshAndRetryQueue.length = 0;
};

/**
 * Extracts error message from Axios error response
 */
const extractErrorMessage = (error: AxiosError): string => {
  const response = error.response;
  const request = error.request;

  // Server responded with error
  if (response) {
    const data = response.data as any;
    
    // Try to extract message from common response structures
    if (data?.message) return data.message;
    if (data?.error?.message) return data.error.message;
    if (data?.error) return String(data.error);
    if (typeof data === "string") return data;
    
    // Fallback to status text
    return response.statusText || `Error ${response.status}`;
  }

  // Request was made but no response received
  if (request) {
    if (error.code === "ECONNABORTED") {
      return "Request timeout. Please try again.";
    }
    if (error.code === "ERR_NETWORK") {
      return "Network error. Please check your connection.";
    }
    return "No response from server. Please try again.";
  }

  // Error setting up request
  return error.message || "An unexpected error occurred.";
};

/**
 * Handles HTTP status code errors with appropriate actions
 */
const handleStatusCodeError = (error: AxiosError): void => {
  const status = error.response?.status;
  const originalConfig = error.config;

  if (!status || !originalConfig) return;

  const errorMessage = extractErrorMessage(error);

  switch (status) {
    case HttpStatusCode.Forbidden:
      // 403 - Redirect to forbidden page
      showErrorToast(errorMessage || "You don't have permission to access this resource.");
      if (window.location.pathname !== PATHS.PUBLIC.FORBIDDEN) {
        window.location.href = PATHS.PUBLIC.FORBIDDEN;
      }
      break;

    case HttpStatusCode.NotFound:
      // 404 - Redirect to not found page
      if (window.location.pathname !== PATHS.PUBLIC.NOT_FOUND) {
        window.location.href = PATHS.PUBLIC.NOT_FOUND;
      }
      break;

    case HttpStatusCode.InternalServerError:
    case HttpStatusCode.BadGateway:
    case HttpStatusCode.ServiceUnavailable:
    case HttpStatusCode.GatewayTimeout:
      // 500, 502, 503, 504 - Redirect to server error page
      showErrorToast(errorMessage || "Server error. Please try again later.");
      if (window.location.pathname !== PATHS.PUBLIC.SERVER_ERROR) {
        window.location.href = PATHS.PUBLIC.SERVER_ERROR;
      }
      break;

    case HttpStatusCode.BadRequest:
      // 400 - Show error toast
      showErrorToast(errorMessage || "Invalid request. Please check your input.");
      break;

    case HttpStatusCode.UnprocessableEntity:
      // 422 - Validation errors
      showErrorToast(errorMessage || "Validation error. Please check your input.");
      break;

    case HttpStatusCode.TooManyRequests:
      // 429 - Rate limiting
      showErrorToast("Too many requests. Please try again later.");
      break;

    default:
      // Other 4xx/5xx errors
      if (status >= 400 && status < 500) {
        showErrorToast(errorMessage || `Client error (${status})`);
      } else if (status >= 500) {
        showErrorToast(errorMessage || `Server error (${status})`);
      }
      break;
  }
};

const errorHandler = async (error: AxiosError): Promise<any> => {
  const originalConfig = error.config;

  // Log error in development
  logError(error);

  // Handle 401 errors (Unauthorized) - Token refresh logic
  if (
    error.response &&
    originalConfig &&
    error.response.status === HttpStatusCode.Unauthorized
  ) {
    const baseURL = error.config?.baseURL;
    if (!baseURL) {
      // Log out the user if the base URL is not found
      logOut();
      return Promise.reject(error);
    }

    // Skip token refresh for auth endpoints (login, refresh token, etc.)
    const isAuthEndpoint = originalConfig.url?.includes("/auth/");
    if (isAuthEndpoint) {
      return Promise.reject(error);
    }

    if (!isRefreshing) {
      isRefreshing = true;
      try {
        // Refresh the access token
        await fetchRefreshToken(baseURL);

        // Retry all requests in the queue with the new token
        refreshAndRetryQueue.forEach(({ axiosConfig, resolve, reject }) => {
          retryRequest(axiosConfig)
            .then((response) => resolve(response))
            .catch((err) => reject(err));
        });

        // Clear the queue
        clearQueue();

        // Retry the original request
        return await retryRequest(originalConfig);
      } catch (refreshError) {
        // Log out the user if the refresh token request fails
        logOut();
        clearQueue();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    } else {
      // Add the original request to the queue
      return new Promise((resolve, reject) => {
        refreshAndRetryQueue.push({
          axiosConfig: originalConfig,
          resolve,
          reject,
        });
      });
    }
  }

  // Handle other status codes
  if (error.response) {
    handleStatusCodeError(error);
  } else if (error.request) {
    // Network error or timeout
    const errorMessage = extractErrorMessage(error);
    showErrorToast(errorMessage);
  } else {
    // Request setup error
    showErrorToast("An unexpected error occurred. Please try again.");
  }

  // For all other errors, reject the promise
  return Promise.reject(error);
};

export default errorHandler;

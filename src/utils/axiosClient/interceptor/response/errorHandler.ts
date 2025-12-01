import type { AxiosError, AxiosRequestConfig } from "axios";

import { HttpStatusCode } from "axios";

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

const errorHandler = async (error: AxiosError) => {
  const originalConfig = error.config;
  // Handle 401 errors
  if (
    error.response &&
    originalConfig &&
    error.response.status === HttpStatusCode.Unauthorized
  ) {
    const baseURL = error.config?.baseURL;
    if (!baseURL) {
      // Log out the user if the base URL is not found
      logOut();
    } else {
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
        } catch {
          // Log out the user if the refresh token request fails
          logOut();
          clearQueue();
          return;
        } finally {
          isRefreshing = false;
        }
      }
      // Add the original request to the queue
      return new Promise<void>((resolve, reject) => {
        refreshAndRetryQueue.push({
          axiosConfig: originalConfig,
          resolve,
          reject,
        });
      });
    }
  }
  // For other types of errors, reject the promise
  return Promise.reject(error);
};

export default errorHandler;

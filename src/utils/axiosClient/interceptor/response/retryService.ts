import type { LoginResponse } from "@services/auth/type";
import type { AxiosRequestConfig } from "axios";

import axios from "axios";

import storageHelpers from "@/utils/storage";
import API_ENDPOINTS from "@configs/api";
import { store } from "@store";
import { _logout } from "@store/slices/userSlice";

const MAX_RETRY_ATTEMPTS = 3; // 3 attempts
const RETRY_DELAY_BASE = 1000; // 1 second base delay
const MAX_RETRY_DELAY = 10000; // 10 seconds max delay

/**
 * Calculates exponential backoff delay with jitter
 */
const calculateRetryDelay = (attempt: number): number => {
  const exponentialDelay = Math.min(
    2 ** attempt * RETRY_DELAY_BASE,
    MAX_RETRY_DELAY
  );
  // Add jitter (±20%) to prevent thundering herd
  const jitter = exponentialDelay * 0.2 * (Math.random() * 2 - 1);
  return Math.floor(exponentialDelay + jitter);
};

/**
 * Checks if an error is retryable
 */
const isRetryableError = (error: any): boolean => {
  if (!error) return false;

  // Network errors are retryable
  if (!error.response) {
    return (
      error.code === "ECONNABORTED" || // Timeout
      error.code === "ERR_NETWORK" || // Network error
      error.code === "ETIMEDOUT" // Connection timeout
    );
  }

  const status = error.response.status;

  // Retry on these status codes
  return (
    status === 408 || // Request Timeout
    status === 429 || // Too Many Requests
    status >= 500 || // Server errors (500-599)
    status === 502 || // Bad Gateway
    status === 503 || // Service Unavailable
    status === 504 // Gateway Timeout
  );
};

/**
 * Retries a failed request with exponential backoff
 */
export async function retryRequest(
  config: AxiosRequestConfig,
  retryAttempts = 0
): Promise<any> {
  if (retryAttempts >= MAX_RETRY_ATTEMPTS) {
    // Reached maximum retry attempts, handle failure
    throw new Error(
      `Request failed after ${MAX_RETRY_ATTEMPTS} retry attempts`
    );
  }

  const retryDelay = calculateRetryDelay(retryAttempts);

  try {
    // Wait before retrying
    await new Promise((resolve) => setTimeout(resolve, retryDelay));

    // Retry the request with the same config and headers with new access token
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${storageHelpers.token.get()}`;

    const response = await axios.request(config);
    return response;
  } catch (error: any) {
    // If error is retryable and we haven't exceeded max attempts, retry
    if (isRetryableError(error) && retryAttempts < MAX_RETRY_ATTEMPTS - 1) {
      return retryRequest(config, retryAttempts + 1);
    }

    // Otherwise, throw the error
    throw error;
  }
}

/**
 * Logs out the user and clears all storage
 */
export const logOut = (): void => {
  // Clear all localstorage data and direct to login page
  store.dispatch(_logout());
};

/**
 * Fetches a new access token using the refresh token
 */
export const fetchRefreshToken = async (baseURL: string): Promise<void> => {
  try {
    const refreshToken = storageHelpers.refreshToken.get();
    
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const resp = await axios
      .create({
        baseURL,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .post<LoginResponse>(API_ENDPOINTS.AUTH.SILENT_LOGIN, {
        refreshToken,
      });

    const result = resp.data;
    const { accessToken, refreshToken: newRefreshToken } = result;

    // Update token and refresh token in local storage
    if (accessToken) {
      storageHelpers.token.set(accessToken);
    }
    if (newRefreshToken) {
      storageHelpers.refreshToken.set(String(newRefreshToken));
    }
  } catch (error) {
    // If refresh fails, log out the user
    logOut();
    throw error;
  }
};

import type { LoginResponse } from "@services/auth/type";
import type { AxiosRequestConfig } from "axios";

import axios from "axios";

import storageHelpers from "@/utils/storage";
import API_ENDPOINTS from "@configs/api";
import { store } from "@store";
import { _logout } from "@store/slices/userSlice";

const MAX_RETRY_ATTEMPTS = 3; // 3 attempts
const RETRY_DELAY_BASE = 1000; // 1 second

export async function retryRequest(
  config: AxiosRequestConfig,
  retryAttempts = 0
) {
  if (retryAttempts >= MAX_RETRY_ATTEMPTS) {
    // Reached maximum retry attempts, handle failure
    return;
  }

  const retryDelay = 2 ** retryAttempts * RETRY_DELAY_BASE;

  const resp = await new Promise((resolve) => {
    setTimeout(() => {
      // Retry the request with the same config and headers with new access token
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${storageHelpers.token.get()}`;
      axios.request(config).then((respRetry) => {
        resolve(respRetry);
      });
    }, retryDelay);
  });
  return resp;
}

export const logOut = () => {
  // Clear all localstorage data and direct to login page
  store.dispatch(_logout());
};

export const fetchRefreshToken = async (baseURL: string) => {
  try {
    const resp = await axios
      .create({
        baseURL,
        headers: {
          Authorization: `Bearer ${storageHelpers.token.get()}`,
        },
      })
      .post(API_ENDPOINTS.AUTH.SILENT_LOGIN, {
        refreshToken: storageHelpers.refreshToken.get(),
      });
    const result: LoginResponse = resp.data;
    const { accessToken, refreshToken } = result;
    // Update token and refresh token in local storage
    storageHelpers.token.set(accessToken);
    storageHelpers.refreshToken.set(`${refreshToken}`);
  } catch {
    logOut();
  }
};

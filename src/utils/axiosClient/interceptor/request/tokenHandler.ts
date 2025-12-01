import storageHelpers from "@/utils/storage";
import { type InternalAxiosRequestConfig } from "axios";

const tokenHandler = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const requiresAuth = config.headers.requiresAuth ?? true;

  if (requiresAuth) {
    const token = storageHelpers.token.get();
    if (token != null) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  delete config.headers.requiresAuth;

  return config;
};

export default tokenHandler;

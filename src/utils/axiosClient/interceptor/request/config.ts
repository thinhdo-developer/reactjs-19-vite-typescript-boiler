import {
  type AxiosInterceptorManager,
  type InternalAxiosRequestConfig,
} from "axios";

import errorHandler from "./errorHandler";
import { generateRequestId, logRequest } from "./logger";
import tokenHandler from "./tokenHandler";

/**
 * Request interceptor configuration
 * Order matters: logger -> requestId -> tokenHandler
 */
const configRequest = (
  request: AxiosInterceptorManager<InternalAxiosRequestConfig>
): void => {
  request.use(
    (config) => {
      // Generate and add request ID for tracking
      if (!config.headers["X-Request-ID"]) {
        config.headers["X-Request-ID"] = generateRequestId();
      }

      // Log request in development
      logRequest(config);

      return config;
    },
    (error) => errorHandler(error)
  );

  request.use(tokenHandler, errorHandler);
};

export default configRequest;

import {
  type AxiosInterceptorManager,
  type InternalAxiosRequestConfig,
} from "axios";

import errorHandler from "./errorHandler";
import tokenHandler from "./tokenHandler";

const configRequest = (
  request: AxiosInterceptorManager<InternalAxiosRequestConfig>
): void => {
  request.use(tokenHandler, errorHandler);
};

export default configRequest;

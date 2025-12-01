import { type AxiosInterceptorManager, type AxiosResponse } from "axios";

import dataHandler from "./dataHandler";
import errorHandler from "./errorHandler";

const configResponse = (
  response: AxiosInterceptorManager<AxiosResponse>
): void => {
  response.use(dataHandler, errorHandler);
};

export default configResponse;

import { type AxiosResponse } from "axios";
import { logResponse } from "./logger";

/**
 * Response data handler
 * Logs successful responses and can transform data if needed
 */
const dataHandler = (response: AxiosResponse): AxiosResponse => {
  // Log response in development
  logResponse(response);

  // You can add data transformation here if needed
  // For example: response.data = transformResponse(response.data);

  return response;
};

export default dataHandler;

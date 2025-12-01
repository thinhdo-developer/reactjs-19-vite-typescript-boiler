import { type AxiosError } from "axios";

const errorHandler = async (error: AxiosError | Error): Promise<AxiosError> =>
  Promise.reject(error);

export default errorHandler;

import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type AxiosRequestConfig,
} from "axios";

import configRequest from "./interceptor/request/config";
import configResponse from "./interceptor/response/config";
import { IAxiosPromise } from "./type";
import { HOST_API_URL } from "@configs/env";

class AxiosService {
  axios: AxiosInstance;

  constructor(url: string) {
    this.axios = axios.create({
      baseURL: url,
      headers: {
        "content-type": "application/json",
      },
    });
    this.registerInterceptors(this.axios);
  }

  registerInterceptors(axiosInst: AxiosInstance): void {
    configRequest(axiosInst.interceptors.request);
    configResponse(axiosInst.interceptors.response);
  }

  /**
   * Sends a GET request to the specified URL using Axios.
   *
   * @template R - The expected response type.
   * @param {string} url - The URL to send the GET request to.
   * @param {AxiosRequestConfig} [options] - Optional Axios request configuration.
   * @returns {Promise<IAxiosPromise<R>>} - A promise that resolves to the response data.
   */
  async getMethod<R>(url: string, options?: AxiosRequestConfig): Promise<IAxiosPromise<R>> {
    return this.mappingData(this.axios.get(url, options));
  }

  /**
   * Sends a POST request to the specified URL with the given data and options.
   *
   * @template R - The expected response type.
   * @param {string} url - The URL to send the POST request to.
   * @param {unknown} data - The data to be sent in the body of the POST request.
   * @param {AxiosRequestConfig} [options] - Optional configuration options for the Axios request.
   * @returns {Promise<IAxiosPromise<R>>} - A promise that resolves to the response of the POST request.
   */
  async postMethod<R>(
    url: string,
    data: unknown,
    options?: AxiosRequestConfig
  ): Promise<IAxiosPromise<R>> {
    return this.mappingData<R>(this.axios.post(url, data, options));
  }

  /**
   * Sends a POST request with form data to the specified URL.
   *
   * @template R - The expected response type.
   * @param {string} url - The URL to send the POST request to.
   * @param {unknown} data - The form data to be sent in the POST request.
   * @param {AxiosRequestConfig} [options] - Optional configuration for the Axios request.
   * @returns {Promise<IAxiosPromise<R>>} - A promise that resolves to the response of the POST request.
   */
  async postFormMethod<R>(
    url: string,
    data: unknown,
    options?: AxiosRequestConfig
  ): Promise<IAxiosPromise<R>> {
    return this.mappingData<R>(this.axios.postForm(url, data, options));
  }

  /**
   * Sends a PUT request to the specified URL with the given data and options.
   *
   * @template R - The expected response type.
   * @param {string} url - The URL to send the PUT request to.
   * @param {unknown} data - The data to be sent in the PUT request.
   * @param {AxiosRequestConfig} [options] - Optional configuration for the Axios request.
   * @returns {Promise<IAxiosPromise<R>>} - A promise that resolves to the response of the PUT request.
   */
  async putMethod<R>(
    url: string,
    data: unknown,
    options?: AxiosRequestConfig
  ): Promise<IAxiosPromise<R>> {
    return this.mappingData<R>(this.axios.put(url, data, options));
  }

  /**
   * Sends a DELETE request to the specified URL.
   *
   * @template R - The expected response type.
   * @param {string} url - The URL to send the DELETE request to.
   * @param {AxiosRequestConfig} [options] - Optional configuration for the request.
   * @returns {Promise<IAxiosPromise<R>>} - A promise that resolves to the response of the DELETE request.
   */
  async deleteMethod<R>(url: string, options?: AxiosRequestConfig): Promise<IAxiosPromise<R>> {
    return this.mappingData<R>(this.axios.delete(url, options));
  }

  /**
   * Maps the data from an Axios response to a custom promise structure.
   *
   * @template R - The type of the response data.
   * @param {Promise<AxiosResponse<R>>} method - The Axios response promise to map.
   * @returns {Promise<IAxiosPromise<R>>} A promise that resolves with the mapped data or rejects with an Axios error.
   */
  async mappingData<R>(method: Promise<AxiosResponse<R>>): Promise<IAxiosPromise<R>> {
    return new Promise<IAxiosPromise<R>>((resolve, reject) => {
      method
        .then((res) => {
          resolve({
            data: res.data,
            status: res.status,
            url: res.config?.url,
            method: res.config?.method,
          });
        })
        .catch((err: AxiosError) => {
          reject(err);
        });
    });
  }
}

const axiosInstances = {
  host: new AxiosService(HOST_API_URL),
};

export default axiosInstances;

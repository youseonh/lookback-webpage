import axios, { Method, AxiosRequestConfig, AxiosPromise } from "axios";
import appConfig from "./appConfig";

type ApiRequestProperties = {
  path: string;
  params?: object;
  url?: string;
  method: Method;
  headers?: object;
  timeout?: number;
  bodyRequest?: object;
  token?: string;
};

export type GetTypes = {
  limit?: number;
  page?: string | number | string[];
  start?: string;
  end?: string;
  status?: string;
};

export const apiRequest = (arguments_: ApiRequestProperties): AxiosPromise => {
  const { method, bodyRequest, params, path, url, timeout, headers } = arguments_;
  const baseUrl = url || appConfig.url.api || "";
  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
    url: `${baseUrl}${path}`,
    method,
  };

  if (headers) {
    config.headers = { ...config.headers, ...headers };
  }

  if (bodyRequest) {
    config.data = bodyRequest;
  }

  if (params) {
    config.params = params;
  }

  if (timeout) {
    config.timeout = timeout;
  }

  return axios(config);
};

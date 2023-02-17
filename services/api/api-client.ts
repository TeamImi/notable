import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export const headers = {
  "Content-Type": "application/json",
};

export class ApiClient {
  /**
   * Configurable axios configuration.
   */
  config: AxiosRequestConfig;

  constructor(config: AxiosRequestConfig) {
    this.config = config;
  }

  createAxios = (): AxiosInstance => {
    return axios.create({
      baseURL: this.config.baseURL,
      timeout: this.config.timeout,
      //   headers: this.config.headers,
    });
  };
}

export const get = async (client: AxiosInstance, url: string) => {
  return await client.get(url, { headers });
};

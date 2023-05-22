import type { AxiosInstance, AxiosRequestConfig } from "axios";
import axios from "axios";

interface CustomInstance extends AxiosInstance {
  get<T = unknown, R = T, D = unknown>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  delete<T = unknown, R = T, D = unknown>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  post<T = unknown, R = T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R>;
  put<T = unknown, R = T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R>;
  patch<T = unknown, R = T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R>;
}
export const api: CustomInstance = axios.create({
  baseURL: "https://pocketyacsa.shop",
  withCredentials: true,
});
api.interceptors.response.use(
  (data) => data.data,
  (err) => {
    if (!axios.isAxiosError(err)) throw new Error("not axios err");
    if (err.response?.data.httpStatus === "UNAUTHORIZED") {
      window.location.href = "/";
    }
    return Promise.reject(err);
  },
);

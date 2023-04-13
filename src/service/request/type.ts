import type { InternalAxiosRequestConfig, AxiosResponse } from "axios";

// 针对InternalAxiosRequestConfig配置进行扩展
export interface HYInterceptors<T = AxiosResponse> {
  requestSuccessFn?: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig;
  requestFailureFn?: (err: any) => any;
  responseSuccessFn?: (res: T) => T;
  responseFailureFn?: (err: any) => any;
}

export interface HYRequestConfig<T = AxiosResponse>
  extends InternalAxiosRequestConfig {
  interceptors?: HYInterceptors<T>;
}

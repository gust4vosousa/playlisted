import { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface IHttpClient {
  handle: <T = any, TR = AxiosResponse<T>, TD = any>(
    request: AxiosRequestConfig<TD>,
  ) => Promise<TR>
}

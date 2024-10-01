import { makeAuthServiceFactory } from '@/application/factories/infra/Auth/AuthServiceFactory'
import { IHttpClient } from '@/infra/HttpClient/HttpClientConfig.types'
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

export class HttpClientConfig implements IHttpClient {
  public httpClientInstance: AxiosInstance

  constructor() {
    this.httpClientInstance = axios.create()
  }

  public handle = async <T = any, TR = AxiosResponse<T>, TD = any>(
    request: AxiosRequestConfig<TD>,
  ): Promise<TR> => {
    try {
      const { getAccessToken } = makeAuthServiceFactory()
      const token = await getAccessToken()

      return await this.httpClientInstance.request<T, TR, TD>({
        ...request,
        headers: {
          ...request?.headers,
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

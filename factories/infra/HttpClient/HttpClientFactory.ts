import { HttpClientConfig } from '@/infra/HttpClient/HttpClientConfig'

export const makeHttpClientFactory = () => new HttpClientConfig()

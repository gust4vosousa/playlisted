import { UserNamespace } from '@/domain/usecases/User'
import { IHttpClient } from '@/infra/HttpClient/HttpClientConfig.types'

export class User implements UserNamespace.THandler {
  constructor(private readonly httpClient: IHttpClient) {}

  handle = async () => {
    const response = await this.httpClient.handle<UserNamespace.TResponse>({
      baseURL: `${process.env.SPOTIFY_API_URL}/v1/me`,
      method: 'get',
    })

    return response.data
  }
}

import { ArtistSearchNamespace } from '@/domain/usecases/Artist'
import { IHttpClient } from '@/infra/HttpClient/HttpClientConfig.types'

export class ArtistSearch implements ArtistSearchNamespace.THandler {
  constructor(private readonly httpClient: IHttpClient) {}

  handle = async ({ artistName }: ArtistSearchNamespace.IRequest) => {
    const response =
      await this.httpClient.handle<ArtistSearchNamespace.IResponse>({
        baseURL: `${process.env.SPOTIFY_API_URL}/v1/search?type=artist&q=${artistName}`,
        method: 'get',
      })

    return response.data
  }
}

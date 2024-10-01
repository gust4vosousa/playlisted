import { TrackSearchNamespace } from '@/domain/usecases/Track/TrackSearch.types'
import { IHttpClient } from '@/infra/HttpClient/HttpClientConfig.types'

export class TrackSearch implements TrackSearchNamespace.THandler {
  constructor(private readonly httpClient: IHttpClient) {}

  handle = async ({ query, offset, limit }: TrackSearchNamespace.IRequest) => {
    const response =
      await this.httpClient.handle<TrackSearchNamespace.IResponse>({
        baseURL: `${process.env.SPOTIFY_API_URL}/v1/search?q=artist:${query}&type=track&limit=${limit}&offset=${offset}`,
        method: 'get',
      })

    return response.data
  }
}

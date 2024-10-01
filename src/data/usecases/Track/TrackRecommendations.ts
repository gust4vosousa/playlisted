import { TrackRecommendationsNamespace } from '@/domain/usecases/Track/TrackRecommendations.types'
import { IHttpClient } from '@/infra/HttpClient/HttpClientConfig.types'

export class TrackRecommendations
  implements TrackRecommendationsNamespace.THandler
{
  constructor(private readonly httpClient: IHttpClient) {}

  handle = async ({
    artistIds,
    limit,
  }: TrackRecommendationsNamespace.IRequest) => {
    const response =
      await this.httpClient.handle<TrackRecommendationsNamespace.IResponse>({
        baseURL: `${process.env.SPOTIFY_API_URL}/v1/recommendations?limit=${limit}&seed_artists=${artistIds}`,
        method: 'get',
      })

    return response.data
  }
}

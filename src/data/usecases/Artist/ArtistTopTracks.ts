import { ArtistTopTracksNamespace } from '@/domain/usecases/Artist'
import { IHttpClient } from '@/infra/HttpClient/HttpClientConfig.types'

export class ArtistTopTracks implements ArtistTopTracksNamespace.THandler {
  constructor(private readonly httpClient: IHttpClient) {}

  handle = async ({ artistId, country }: ArtistTopTracksNamespace.IRequest) => {
    const response =
      await this.httpClient.handle<ArtistTopTracksNamespace.IResponse>({
        baseURL: `${process.env.SPOTIFY_API_URL}/v1/artists/${artistId}/top-tracks?market=${country}`,
        method: 'get',
      })

    return response.data
  }
}

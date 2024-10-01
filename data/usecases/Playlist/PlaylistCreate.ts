import { PlaylistCreateNamespace } from '@/domain/usecases/Playlist/PlaylistCreate.types'
import { IHttpClient } from '@/infra/HttpClient/HttpClientConfig.types'

export class PlaylistCreate implements PlaylistCreateNamespace.THandler {
  constructor(private readonly httpClient: IHttpClient) {}

  handle = async ({
    description,
    name,
    userId,
  }: PlaylistCreateNamespace.IRequest) => {
    const response =
      await this.httpClient.handle<PlaylistCreateNamespace.TResponse>({
        baseURL: `${process.env.SPOTIFY_API_URL}/v1/users/${userId}/playlists`,
        data: { description, name },
        method: 'post',
      })

    return response.data
  }
}

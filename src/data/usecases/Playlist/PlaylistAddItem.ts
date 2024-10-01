import { PlaylistAddItemNamespace } from '@/domain/usecases/Playlist/PlaylistAddItem.types'
import { IHttpClient } from '@/infra/HttpClient/HttpClientConfig.types'

export class PlaylistAddItem implements PlaylistAddItemNamespace.THandler {
  constructor(private readonly httpClient: IHttpClient) {}

  handle = async ({
    playlistId,
    tracks,
  }: PlaylistAddItemNamespace.IRequest) => {
    await this.httpClient.handle<PlaylistAddItemNamespace.TResponse>({
      baseURL: `${process.env.SPOTIFY_API_URL}/v1/playlists/${playlistId}/tracks`,
      data: tracks,
      method: 'post',
    })
  }
}

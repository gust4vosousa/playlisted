import { makeHttpClientFactory } from '@/application/factories/infra/HttpClient/HttpClientFactory'
import { PlaylistAddItem } from '@/data/usecases/Playlist'

export const makePlaylistAddItemFactory = () =>
  new PlaylistAddItem(makeHttpClientFactory())

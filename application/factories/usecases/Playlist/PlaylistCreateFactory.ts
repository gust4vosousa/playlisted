import { makeHttpClientFactory } from '@/application/factories/infra/HttpClient/HttpClientFactory'
import { PlaylistCreate } from '@/data/usecases/Playlist'

export const makePlaylistCreateFactory = () =>
  new PlaylistCreate(makeHttpClientFactory())

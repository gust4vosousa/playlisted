import { makeHttpClientFactory } from '@/application/factories/infra/HttpClient/HttpClientFactory'
import { ArtistTopTracks } from '@/data/usecases/Artist'

export const makeArtistTopTracksFactory = () =>
  new ArtistTopTracks(makeHttpClientFactory())

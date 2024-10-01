import { makeHttpClientFactory } from '@/application/factories/infra/HttpClient/HttpClientFactory'
import { ArtistSearch } from '@/data/usecases/Artist'

export const makeArtistSearchFactory = () =>
  new ArtistSearch(makeHttpClientFactory())

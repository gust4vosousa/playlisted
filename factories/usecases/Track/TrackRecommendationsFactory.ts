import { makeHttpClientFactory } from '@/application/factories/infra/HttpClient/HttpClientFactory'
import { TrackRecommendations } from '@/data/usecases/Track'

export const makeTrackRecommendationsFactory = () =>
  new TrackRecommendations(makeHttpClientFactory())

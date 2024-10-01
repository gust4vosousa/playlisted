import { makeHttpClientFactory } from '@/application/factories/infra/HttpClient/HttpClientFactory'
import { User } from '@/data/usecases/User/User'

export const makeUserFactory = () => new User(makeHttpClientFactory())

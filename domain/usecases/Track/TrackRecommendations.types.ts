import { RequestNamespace } from '@/domain/application/Request/Request.types'
import { ITrack } from '@/domain/entities'

export namespace TrackRecommendationsNamespace {
  export interface IRequest {
    limit: number
    artistIds: string[]
  }

  export interface IResponse {
    tracks: ITrack[]
  }

  export type THandler = RequestNamespace.IHandler<Promise<IResponse>, IRequest>
}

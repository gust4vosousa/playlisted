import { RequestNamespace } from '@/domain/application/Request/Request.types'
import { ITrack } from '@/domain/entities'

export namespace TrackSearchNamespace {
  export interface IRequest {
    limit: number
    offset?: number
    query: string
  }

  export interface IResponse {
    tracks: {
      items: ITrack[]
    }
  }

  export type THandler = RequestNamespace.IHandler<Promise<IResponse>, IRequest>
}

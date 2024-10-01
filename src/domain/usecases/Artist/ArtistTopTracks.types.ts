import { RequestNamespace } from '@/domain/application/Request/Request.types'
import { ITrack, IUserDetails } from '@/domain/entities'

export namespace ArtistTopTracksNamespace {
  export interface IRequest {
    artistId: string
    country: IUserDetails['country']
  }

  export interface IResponse {
    tracks: ITrack[]
  }

  export type THandler = RequestNamespace.IHandler<Promise<IResponse>, IRequest>
}

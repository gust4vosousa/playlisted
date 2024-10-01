import { RequestNamespace } from '@/domain/application/Request/Request.types'
import { IPlaylist, IUserDetails } from '@/domain/entities'

export namespace PlaylistCreateNamespace {
  export interface IRequest {
    description?: string
    name: string
    userId: IUserDetails['id']
  }

  export type TResponse = IPlaylist

  export type THandler = RequestNamespace.IHandler<Promise<TResponse>, IRequest>
}

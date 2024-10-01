import { RequestNamespace } from '@/domain/application/Request/Request.types'

export namespace PlaylistAddItemNamespace {
  export interface IRequest {
    playlistId: string
    tracks: string[]
  }

  export type TResponse = void

  export type THandler = RequestNamespace.IHandler<Promise<TResponse>, IRequest>
}

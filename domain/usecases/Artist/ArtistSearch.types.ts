import { RequestNamespace } from '@/domain/application/Request/Request.types'
import { IArtist } from '@/domain/entities/Artist/ArtistEntity.types'

export namespace ArtistSearchNamespace {
  export interface IRequest {
    artistName: string
  }

  export interface IResponse {
    artists: {
      items: IArtist[]
    }
  }

  export type THandler = RequestNamespace.IHandler<Promise<IResponse>, IRequest>
}

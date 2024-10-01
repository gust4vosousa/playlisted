import { RequestNamespace } from '@/domain/application/Request/Request.types'
import { IUserDetails } from '@/domain/entities'

export namespace UserNamespace {
  export type TRequest = void

  export type TResponse = IUserDetails

  export type THandler = RequestNamespace.IHandler<Promise<TResponse>, TRequest>
}

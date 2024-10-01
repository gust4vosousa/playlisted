import { RequestNamespace } from '@/domain/application/Request/Request.types'

export interface IUseHandleRequest<TResponse, TRequest> {
  data: TResponse | null
  handle: (request: TRequest) => Promise<TResponse>
  isBusy: boolean
  isFailure: boolean
  isIdle: boolean
  isSuccess: boolean
  reset: () => void
  state: RequestNamespace.IAction<TResponse> | null
}

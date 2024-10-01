import { useState } from 'react'

import { RequestNamespace } from '@/domain/application/Request/Request.types'
import { IUseHandleRequest } from '@/presentation/hooks/UseHandleRequest/UseHandleRequest.types'

export const useHandleRequest = <TResponse, TRequest>(
  service: RequestNamespace.IHandler<Promise<TResponse>, TRequest>,
): IUseHandleRequest<TResponse, TRequest> => {
  const [state, setState] = useState<RequestNamespace.IAction<TResponse>>({
    status: 'idle',
  })

  const isBusy = state?.status === 'busy'
  const isFailure = state?.status === 'failure'
  const isIdle = state?.status === 'idle'
  const isSuccess = state?.status === 'success'

  const handle = async (request: TRequest) => {
    setState(prev => ({
      ...(prev || {}),
      status: 'busy',
    }))

    try {
      const response = await service.handle(request)

      setState({ data: response, status: 'success' })

      return response
    } catch (error) {
      setState(prev => ({
        ...(prev || {}),
        status: 'failure',
      }))

      throw error
    }
  }

  const reset = () => {
    setState({ status: 'idle' })
  }

  return {
    data: state?.data || null,
    handle,
    isBusy,
    isFailure,
    isIdle,
    isSuccess,
    reset,
    state,
  }
}

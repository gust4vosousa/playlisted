export namespace RequestNamespace {
  export interface IAction<TData> {
    status: TStatus
    data?: TData
  }

  export interface IHandler<TResult = void, TRequest = void> {
    handle: (request: TRequest) => TResult
  }

  type TStatus = 'busy' | 'failure' | 'idle' | 'success'
}

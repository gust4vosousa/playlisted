import { useCallback, useEffect, useState } from 'react'

import { IAuthContext } from '@/application/contexts/Auth/AuthContext.types'
import { makeAuthServiceFactory } from '@/application/factories/infra/Auth/AuthServiceFactory'
import { makeUserFactory } from '@/application/factories/usecases/User'
import { IUserDetails } from '@/domain/entities'
import { useHandleRequest } from '@/presentation/hooks/UseHandleRequest/UseHandleRequest'

export const useAuthProvider = () => {
  const [userDetails, setUserDetails] = useState<IUserDetails | null>(null)

  const userService = useHandleRequest(makeUserFactory())

  const auth = makeAuthServiceFactory()

  const isAuthenticated = !!window.localStorage.getItem('access_token')

  const handleLogin = async () => {
    await auth.handleLogin()
  }

  const handleLogout = () => {
    auth.handleLogout()
    setUserDetails(null)
  }

  const handleUserDetails = useCallback(async () => {
    const user = await userService.handle({})
    setUserDetails(user)
  }, [userService])

  const userContextValue: IAuthContext = {
    handleLogin,
    handleLogout,
    isAuthenticated,
    userDetails,
    setUserDetails,
  }

  useEffect(() => {
    if (isAuthenticated && !userDetails) {
      handleUserDetails()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, userDetails])

  return { userContextValue }
}

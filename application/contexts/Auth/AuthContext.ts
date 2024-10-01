import { createContext, useContext } from 'react'

import { IAuthContext } from '@/application/contexts/Auth/AuthContext.types'

export const AuthContext = createContext<IAuthContext>({
  handleLogin: () => {},
  handleLogout: () => {},
  isAuthenticated: false,
  userDetails: null,
  setUserDetails: () => {},
})

export const useAuthContext = () => useContext(AuthContext)

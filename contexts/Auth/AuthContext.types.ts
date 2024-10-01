import { IUserDetails } from '@/domain/entities'

export interface IAuthContext {
  handleLogin: () => void
  handleLogout: () => void
  isAuthenticated: boolean
  userDetails: IUserDetails | null
  setUserDetails: (value: IUserDetails | null) => void
}

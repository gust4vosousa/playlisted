import { PropsWithChildren } from 'react'

import { AuthContext } from '@/application/contexts'
import { useAuthProvider } from '@/presentation/components/Providers/Auth/AuthProvider.rules'

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { userContextValue } = useAuthProvider()

  return (
    <AuthContext.Provider value={userContextValue}>
      {children}
    </AuthContext.Provider>
  )
}

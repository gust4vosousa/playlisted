import { Fragment, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuthContext } from '@/application/contexts/Auth/AuthContext'
import { HeaderComponent } from '@/presentation/components/Navigation/Header/HeaderComponent'
import { IScreenProps } from '@/presentation/components/Providers/Screen/ScreenProvider.types'
import { Box } from '@mui/material'

export const ScreenProvider: React.FC<IScreenProps> = ({ children }) => {
  const navigate = useNavigate()

  const { isAuthenticated } = useAuthContext()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  return (
    <Fragment>
      <HeaderComponent />
      <Box display='flex' flexDirection='column' gap={2} padding={2}>
        {children}
      </Box>
    </Fragment>
  )
}

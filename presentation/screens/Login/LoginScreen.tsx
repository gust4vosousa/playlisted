import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuthContext } from '@/application/contexts'
import { translate } from '@/application/utils/Translate/TranslateUtil'
import { ButtonComponent } from '@/presentation/components/Input/Button/ButtonComponent'
import { ScreenProvider } from '@/presentation/components/Providers/Screen/ScreenProvider'
import { Box, Typography } from '@mui/material'

export const LoginScreen: React.FC = () => {
  const { handleLogin, isAuthenticated } = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  return (
    <ScreenProvider>
      <Box alignItems='center' display='flex' flexDirection='column' gap={2}>
        <Typography>{translate.t('login_screen.log_in')}</Typography>

        <Box>
          <ButtonComponent
            color='primary'
            onClick={handleLogin}
            variant='contained'
          >
            {translate.t('login_screen.log_in_spotify')}
          </ButtonComponent>
        </Box>
      </Box>
    </ScreenProvider>
  )
}

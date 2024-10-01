import { useAuthContext } from '@/application/contexts'
import { translate } from '@/application/utils/Translate/TranslateUtil'
import { LogoComponent } from '@/presentation/components/Data/Logo/LogoComponent'
import { ButtonComponent } from '@/presentation/components/Input/Button/ButtonComponent'
import { AppBar, Toolbar } from '@mui/material'

export const HeaderComponent: React.FC = () => {
  const { handleLogout, isAuthenticated } = useAuthContext()

  return (
    <AppBar position='static'>
      <Toolbar
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <LogoComponent />

        {isAuthenticated && (
          <ButtonComponent
            color='inherit'
            icon='logout'
            onClick={handleLogout}
            variant='text'
          >
            {translate.t('header.logout')}
          </ButtonComponent>
        )}
      </Toolbar>
    </AppBar>
  )
}

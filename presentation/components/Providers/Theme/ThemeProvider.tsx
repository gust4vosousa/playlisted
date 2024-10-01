import { PropsWithChildren } from 'react'

import { useCustomTheme } from '@/presentation/components/Providers/Theme/ThemeProvider.rules'
import {
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from '@mui/material'

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const customTheme = useCustomTheme()
  const theme = createTheme(customTheme)

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}

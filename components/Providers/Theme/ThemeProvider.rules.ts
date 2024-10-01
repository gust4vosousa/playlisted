import { ThemeOptions } from '@mui/material'

export const useCustomTheme = (): ThemeOptions => {
  const palette: ThemeOptions['palette'] = {
    action: {
      disabledBackground: '#b8b7b0',
    },
    background: {
      default: '#00001f',
      paper: '#202038',
    },
    divider: '#202038',
    error: {
      dark: '#99111a',
      main: '#CB2331',
    },
    primary: {
      dark: '#bf382c',
      light: '#fa6052',
      main: '#e34234',
    },
    secondary: {
      dark: '#094257',
      light: '#228bb3',
      main: '#0d698b',
    },
    text: {
      primary: '#f2f1e8',
      secondary: '#b8b7b0',
    },
  }

  const components: ThemeOptions['components'] = {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: palette.background?.default,
          boxShadow: 'none',
          color: palette.text?.primary,
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        clearIndicator: {
          color: palette.text?.secondary,
        },
        popupIndicator: {
          color: palette.text?.secondary,
        },
        paper: {
          borderRadius: '32px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '32px',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: palette.background?.paper,
          borderRadius: '32px !important',
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          color: palette.text?.secondary,
        },
      },
    },
  }

  const typography: ThemeOptions['typography'] = {
    fontFamily: 'Roboto Condensed',
    fontSize: 16,
    allVariants: {
      fontFamily: 'Roboto Condensed',
    },
    body1: {
      fontSize: 16,
    },
  }

  return {
    components,
    palette,
    typography,
  }
}

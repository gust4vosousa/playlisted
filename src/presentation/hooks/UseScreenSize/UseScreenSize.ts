import { Breakpoint, useMediaQuery, useTheme } from '@mui/material'

export const useScreenSize = () => {
  const theme = useTheme()

  const screenSizes: Record<Breakpoint, boolean> = {
    xs: useMediaQuery(theme.breakpoints.down('xs')),
    sm: useMediaQuery(theme.breakpoints.down('sm')),
    md: useMediaQuery(theme.breakpoints.down('md')),
    lg: useMediaQuery(theme.breakpoints.down('lg')),
    xl: useMediaQuery(theme.breakpoints.down('xl')),
  }

  return (
    (Object.keys(screenSizes).find(
      size => screenSizes[size as Breakpoint],
    ) as Breakpoint) || 'xl'
  )
}

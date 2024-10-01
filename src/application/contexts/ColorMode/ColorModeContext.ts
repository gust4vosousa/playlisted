import { createContext, useContext } from 'react'

import { IColorModeContext } from '@/application/contexts/ColorMode/ColorModeContext.types'

export const ColorModeContext = createContext<IColorModeContext>({
  currentColorMode: 'dark',
  toggleColorMode: () => null,
})

export const useColorModeContext = () => useContext(ColorModeContext)

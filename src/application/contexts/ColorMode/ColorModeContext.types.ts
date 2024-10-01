import { PaletteMode } from '@mui/material'

export interface IColorModeContext {
  currentColorMode: PaletteMode
  toggleColorMode: () => void
}

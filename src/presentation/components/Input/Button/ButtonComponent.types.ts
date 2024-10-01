import { ButtonProps } from '@mui/material'

export interface IButtonProps
  extends Omit<ButtonProps, 'endIcon' | 'startIcon'> {
  icon?: string
  inProgress?: boolean
}

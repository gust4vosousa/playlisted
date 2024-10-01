import { IconProps } from '@mui/material'

export interface IIconProps extends Omit<IconProps, 'children'> {
  icon: string
}

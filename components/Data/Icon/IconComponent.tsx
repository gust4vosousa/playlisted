import { IIconProps } from '@/presentation/components/Data/Icon/IconComponent.types'
import { Icon } from '@mui/material'

export const IconComponent: React.FC<IIconProps> = props => (
  <Icon {...props}>{props.icon}</Icon>
)

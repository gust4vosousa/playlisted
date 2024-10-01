import { IconComponent } from '@/presentation/components/Data/Icon/IconComponent'
import { IButtonProps } from '@/presentation/components/Input/Button/ButtonComponent.types'
import { Button, CircularProgress } from '@mui/material'

export const ButtonComponent: React.FC<IButtonProps> = ({
  children,
  icon,
  inProgress,
  ...props
}) => (
  <Button
    {...props}
    disabled={props?.disabled || inProgress}
    size={props?.size || 'small'}
    startIcon={
      inProgress ? (
        <CircularProgress color='inherit' size={16} />
      ) : (
        icon && <IconComponent icon={icon} />
      )
    }
  >
    {children}
  </Button>
)

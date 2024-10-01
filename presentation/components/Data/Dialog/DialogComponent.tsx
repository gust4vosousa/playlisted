import { IDialogComponentProps } from '@/presentation/components/Data/Dialog/DialogComponent.types'
import { ButtonComponent } from '@/presentation/components/Input/Button/ButtonComponent'
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material'
import { IconComponent } from '../Icon/IconComponent'

export const DialogComponent: React.FC<IDialogComponentProps> = ({
  actions,
  children,
  isOpen,
  title,
  ...props
}) => (
  <Dialog open={isOpen} {...props}>
    {title && (
      <DialogTitle>
        <Box display='flex' justifyContent='space-between'>
          {title}
          <Box color='text.secondary'>
            <IconButton color='inherit' onClick={props.onClose}>
              <IconComponent icon='close' />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
    )}

    <DialogContent>{children}</DialogContent>

    {actions && (
      <DialogActions>
        <Box display='flex' gap={2}>
          {actions.map(({ children, ...props }, index) => (
            <ButtonComponent {...props} key={`Action ${index}`}>
              {children}
            </ButtonComponent>
          ))}
        </Box>
      </DialogActions>
    )}
  </Dialog>
)

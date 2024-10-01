import { IButtonProps } from '@/presentation/components/Input/Button/ButtonComponent.types'
import { DialogProps } from '@mui/material'

export interface IDialogComponentProps
  extends Omit<DialogProps, 'onSubmit' | 'open'> {
  actions?: IButtonProps[]
  isOpen: boolean
  onClose: () => void
}

import { StepperProps } from '@mui/material'
import { IButtonProps } from '../../Input/Button/ButtonComponent.types'

export interface IStepperComponentProps extends StepperProps {
  steps: IStep[]
}

interface IStep {
  title: string
  actions?: IButtonProps[]
  content?: React.ReactNode
}

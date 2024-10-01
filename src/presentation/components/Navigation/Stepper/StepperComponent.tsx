import { IStepperComponentProps } from '@/presentation/components/Navigation/Stepper/StepperComponent.types'
import { Box, Step, StepContent, StepLabel, Stepper } from '@mui/material'
import { ButtonComponent } from '../../Input/Button/ButtonComponent'

export const StepperComponent: React.FC<IStepperComponentProps> = ({
  steps,
  ...props
}) => {
  return (
    <Stepper {...props}>
      {steps.map((step, index) => (
        <Step active={props.activeStep === index} key={step.title}>
          <StepLabel>{step.title}</StepLabel>
          <StepContent>
            <Box
              display='flex'
              flexDirection='column'
              gap={4}
              padding='8px 0px'
            >
              {step?.content}

              <Box display='flex' gap={2}>
                {step?.actions?.map((action, index) => (
                  <ButtonComponent
                    {...action}
                    key={index}
                    variant='contained'
                  />
                ))}
              </Box>
            </Box>
          </StepContent>
        </Step>
      ))}
    </Stepper>
  )
}

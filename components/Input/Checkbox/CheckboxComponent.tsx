import { ICheckboxComponentProps } from '@/presentation/components/Input/Checkbox/CheckboxComponent.types'
import { Checkbox, FormControlLabel } from '@mui/material'

export const CheckboxComponent: React.FC<ICheckboxComponentProps> = ({
  isChecked,
  label,
  onChange,
}) => (
  <FormControlLabel
    control={
      <Checkbox checked={isChecked} onChange={(_e, value) => onChange(value)} />
    }
    label={label}
  />
)

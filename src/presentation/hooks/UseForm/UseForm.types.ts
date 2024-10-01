import {
  DefaultValues as TDefaultValues,
  FieldValues as TFieldValues,
  UseFormProps as TUseFormProps,
} from 'react-hook-form'

import * as Yup from 'yup'

interface IValidatorSchema<T> {
  validationSchema?: Record<keyof T, Yup.AnySchema>
}

export interface IUseFormProps<T extends TFieldValues>
  extends Omit<TUseFormProps, 'resolver'>,
    IValidatorSchema<T> {
  defaultValues?: TDefaultValues<T>
}

export type { TFieldValues }

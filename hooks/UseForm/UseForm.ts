import { useCallback } from 'react'
import {
  Controller,
  UseFormRegisterReturn,
  useForm as useFormLib,
} from 'react-hook-form'
import * as Yup from 'yup'

import {
  IUseFormProps,
  TFieldValues,
} from '@/presentation/hooks/UseForm/UseForm.types'
import { yupResolver } from '@hookform/resolvers/yup'

export { Yup as Validator }

export const useForm = <T extends TFieldValues>({
  validationSchema,
  ...props
}: IUseFormProps<T>) => {
  const resolver = yupResolver(
    Yup.object().shape({
      ...validationSchema,
    }),
  )

  const form = useFormLib<T>({
    ...props,
    //@ts-ignore
    resolver,
  })

  const changeRegisterRefName = useCallback(
    (
      { ref, ...rest }: UseFormRegisterReturn,
      newRefName: string,
    ): Omit<UseFormRegisterReturn, 'ref'> => ({ ...rest, [newRefName]: ref }),
    [],
  )

  return {
    changeRegisterRefName,
    Controller,
    ...form,
  }
}

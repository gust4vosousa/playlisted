import { useEffect, useState } from 'react'

import { EDebounceDelay } from '@/presentation/hooks/UseStateDebounce/UseStateDebounce.types'

export const useStateDebounce = <TInitialValue>(
  initialValue: TInitialValue,
  delay: EDebounceDelay = EDebounceDelay.default,
): [typeof initialValue, (value: TInitialValue) => void] => {
  const [value, setValue] = useState<typeof initialValue>(initialValue)
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)

  const setValueDebounce = (value: TInitialValue) => {
    if (timer) {
      clearTimeout(timer)
    }

    const timeout = setTimeout(() => setValue(value), delay)
    setTimer(timeout)
  }

  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [timer])

  return [value, setValueDebounce]
}

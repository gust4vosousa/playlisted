import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { usePlaylistContext } from '@/application/contexts'
import { makeArtistSearchFactory } from '@/application/factories/usecases/Artist'
import { IArtist } from '@/domain/entities'
import { Validator, useForm } from '@/presentation/hooks/UseForm/UseForm'
import { useHandleRequest } from '@/presentation/hooks/UseHandleRequest/UseHandleRequest'
import { useStateDebounce } from '@/presentation/hooks/UseStateDebounce/UseStateDebounce'
import { IPlaylistForm } from '@/presentation/screens/Home/HomeScreen.types'

export const useHomeScreen = () => {
  const [activeStep, setActiveStep] = useState<number>(0)
  const [inputValue, setInputValue] = useStateDebounce<string>('')

  const navigate = useNavigate()

  const { playlistData } = usePlaylistContext()

  const artistSearch = useHandleRequest(makeArtistSearchFactory())

  const form = useForm<IPlaylistForm>({
    defaultValues: {
      artists: [],
      similarArtists: false,
      size: 20,
    },
    validationSchema: {
      artists: Validator.array().required(),
      similarArtists: Validator.boolean().required(),
      size: Validator.number().required(),
    },
  })

  const handlePreviousStep = () => {
    setActiveStep(prev => prev - 1)
  }

  const handleNextStep = () => {
    setActiveStep(prev => prev + 1)
  }

  const handleInputChange = useCallback(
    (input: string) => {
      if (input !== inputValue) {
        setInputValue(input)
      }
    },
    [inputValue, setInputValue],
  )

  const handleSelectArtist = useCallback(
    (artist: IArtist) => {
      const isAlreadyIncluded = form
        .watch('artists')
        .map(artist => artist.id)
        .includes(artist.id)

      if (isAlreadyIncluded) {
        return
      }

      form.setValue('artists', [...form.watch('artists'), artist])
    },
    [form],
  )

  useEffect(() => {
    if (inputValue) {
      artistSearch.handle({ artistName: inputValue })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue])

  useEffect(() => {
    if (playlistData.length > 0) {
      navigate('/playlist')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playlistData])

  return {
    activeStep,
    artistSearch,
    form,
    handleInputChange,
    handleNextStep,
    handlePreviousStep,
    handleSelectArtist,
  }
}

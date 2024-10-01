import { Box, Link, TextField } from '@mui/material'

import { useAuthContext, usePlaylistContext } from '@/application/contexts'
import { translate } from '@/application/utils/Translate/TranslateUtil'
import { DialogComponent } from '@/presentation/components/Data/Dialog/DialogComponent'
import { IconComponent } from '@/presentation/components/Data/Icon/IconComponent'
import { IButtonProps } from '@/presentation/components/Input/Button/ButtonComponent.types'
import {
  TPlaylistExportDialogProps,
  TPlaylistExportForm,
} from '@/presentation/dialogs/PlaylistExport/PlaylistExportDialog.types'
import { Validator, useForm } from '@/presentation/hooks/UseForm/UseForm'

export const PlaylistExportDialog: React.FC<TPlaylistExportDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const { userDetails } = useAuthContext()

  const { handleExportPlaylist, isExportPlaylistBusy, playlistUrl } =
    usePlaylistContext()

  const {
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<TPlaylistExportForm>({
    defaultValues: {
      name: '',
    },
    validationSchema: {
      description: Validator.string().notRequired(),
      name: Validator.string().required(),
    },
  })

  const actions: IButtonProps[] = [
    {
      children: translate.t('generic.labels.back'),
      color: 'secondary',
      disabled: isExportPlaylistBusy,
      icon: 'arrow_back',
      onClick: onClose,
      variant: 'contained',
    },
    ...(!playlistUrl
      ? [
          {
            children: translate.t('generic.labels.export'),
            icon: 'upload',
            inProgress: isExportPlaylistBusy,
            onClick: handleSubmit(values =>
              handleExportPlaylist({ userId: userDetails?.id!, ...values }),
            ),
            variant: 'contained',
          } as IButtonProps,
        ]
      : []),
  ]

  return (
    <DialogComponent
      actions={actions}
      fullWidth
      isOpen={isOpen}
      onClose={onClose}
      title={translate.t('playlist_export.title')}
    >
      <Box display='flex' flexDirection='column' gap={4} paddingTop={2}>
        {playlistUrl ? (
          <Box alignItems='center' display='flex' gap={1}>
            {translate.t('playlist_export.exported')}
            <Link href={playlistUrl} rel='noopener noreferrer' target='_blank'>
              <Box
                alignItems='center'
                display='flex'
                gap='4px'
                sx={{ cursor: 'pointer' }}
              >
                {translate.t('playlist_export.click_here')}
                <IconComponent fontSize='inherit' icon='launch' />
              </Box>
            </Link>
          </Box>
        ) : (
          <>
            <TextField
              error={!!errors.name}
              fullWidth
              label={translate.t('playlist_export.name')}
              onChange={({ target: { value } }) => setValue('name', value)}
              required
              size='small'
              variant='outlined'
            />

            <TextField
              error={!!errors.description}
              fullWidth
              label={translate.t('playlist_export.description')}
              onChange={({ target: { value } }) =>
                setValue('description', value)
              }
              size='small'
              variant='outlined'
            />
          </>
        )}
      </Box>
    </DialogComponent>
  )
}

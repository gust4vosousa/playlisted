import { usePlaylistContext } from '@/application/contexts'
import { translate } from '@/application/utils/Translate/TranslateUtil'
import { ButtonComponent } from '@/presentation/components/Input/Button/ButtonComponent'
import { CheckboxComponent } from '@/presentation/components/Input/Checkbox/CheckboxComponent'
import { StepperComponent } from '@/presentation/components/Navigation/Stepper/StepperComponent'
import { ScreenProvider } from '@/presentation/components/Providers/Screen/ScreenProvider'
import { useHomeScreen } from '@/presentation/screens/Home/HomeScreen.rules'
import {
  Autocomplete,
  Avatar,
  Box,
  Chip,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material'

export const HomeScreen: React.FC = () => {
  const { handleCreatePlaylist, isCreatePlaylistBusy } = usePlaylistContext()

  const {
    activeStep,
    artistSearch,
    form: { handleSubmit, setValue, watch },
    handleInputChange,
    handleNextStep,
    handlePreviousStep,
    handleSelectArtist,
  } = useHomeScreen()

  return (
    <ScreenProvider>
      <Box maxWidth='600px'>
        <StepperComponent
          activeStep={activeStep}
          orientation='vertical'
          steps={[
            {
              title: translate.t('playlist_form.step_1_title'),
              actions: [
                {
                  children: translate.t('generic.labels.next'),
                  disabled: watch('artists').length === 0,
                  onClick: handleNextStep,
                },
              ],
              content: (
                <Box display='flex' flexDirection='column' gap={4}>
                  <Box display='flex' flexDirection='column' gap={2}>
                    <Autocomplete
                      getOptionLabel={option => option.name}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      onChange={(_e, value) =>
                        value && handleSelectArtist(value)
                      }
                      options={artistSearch.data?.artists.items || []}
                      renderInput={params => (
                        <TextField
                          {...params}
                          onChange={({ target }) =>
                            handleInputChange(target.value)
                          }
                          label={translate.t('playlist_form.search_artists')}
                        />
                      )}
                      renderOption={(props, { id, images, name }) => (
                        <ListItem {...props} key={id}>
                          <ListItemAvatar>
                            <Avatar alt='Artist image' src={images[0]?.url} />
                          </ListItemAvatar>
                          <ListItemText primary={name} />
                        </ListItem>
                      )}
                      size='small'
                    />
                  </Box>

                  <Box display='flex' flexDirection='column' gap={1}>
                    <Box alignItems='center' display='flex' gap={1}>
                      <Typography>
                        {watch('artists').length > 0
                          ? translate.t('playlist_form.selected_artists')
                          : translate.t('playlist_form.no_artists')}
                      </Typography>
                      {watch('artists').length > 0 && (
                        <Box color='secondary.light'>
                          <ButtonComponent
                            color='inherit'
                            icon='delete'
                            onClick={() => setValue('artists', [])}
                            variant='outlined'
                          >
                            {translate.t('generic.labels.clear')}
                          </ButtonComponent>
                        </Box>
                      )}
                    </Box>

                    <Box display='flex' flexWrap='wrap' gap={1}>
                      {watch('artists').map(({ id, name, images }) => (
                        <Chip
                          avatar={
                            <Avatar alt='Artist avatar' src={images[0]?.url} />
                          }
                          color='secondary'
                          key={id}
                          label={name}
                          onDelete={() =>
                            setValue(
                              'artists',
                              watch('artists').filter(
                                artist => artist.id !== id,
                              ),
                            )
                          }
                        />
                      ))}
                    </Box>
                  </Box>
                </Box>
              ),
            },
            {
              title: translate.t('playlist_form.step_2_title'),
              actions: [
                {
                  children: translate.t('generic.labels.back'),
                  color: 'secondary',
                  onClick: handlePreviousStep,
                },
                {
                  children: translate.t('generic.labels.create'),
                  inProgress: isCreatePlaylistBusy,
                  onClick: handleSubmit(handleCreatePlaylist),
                },
              ],
              content: (
                <Box display='flex'>
                  <Box display='flex' flexDirection='column' gap={2}>
                    <Autocomplete
                      getOptionLabel={value =>
                        `${value} ${translate.t('generic.labels.songs')}`
                      }
                      isOptionEqualToValue={(option, value) => option === value}
                      onChange={(_e, value) => value && setValue('size', value)}
                      options={[10, 20, 50, 100]}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label={translate.t('playlist_form.playlist_size')}
                        />
                      )}
                      size='small'
                      value={watch('size')}
                    />

                    <CheckboxComponent
                      isChecked={watch('similarArtists')}
                      label={translate.t('playlist_form.similar_artists')}
                      onChange={value => setValue('similarArtists', value)}
                    />
                  </Box>
                </Box>
              ),
            },
          ]}
        />
      </Box>
    </ScreenProvider>
  )
}

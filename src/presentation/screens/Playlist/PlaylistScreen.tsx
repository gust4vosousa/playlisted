import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { usePlaylistContext } from '@/application/contexts'
import { translate } from '@/application/utils/Translate/TranslateUtil'
import { TrackListComponent } from '@/presentation/components/Data/Track/List/TrackListComponent'
import { ButtonComponent } from '@/presentation/components/Input/Button/ButtonComponent'
import { ScreenProvider } from '@/presentation/components/Providers/Screen/ScreenProvider'
import { PlaylistExportDialog } from '@/presentation/dialogs/PlaylistExport/PlaylistExportDialog'
import { Box } from '@mui/material'

export const PlaylistScreen: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  const navigate = useNavigate()

  const { handleRefreshPlaylist, handleResetPlaylist, playlistData } =
    usePlaylistContext()

  useEffect(() => {
    if (playlistData.length === 0) {
      navigate('/home')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playlistData])

  return (
    <ScreenProvider>
      <Box
        alignItems='center'
        display='flex'
        flexDirection='row'
        gap='8px'
        width='100%'
      >
        <Box display='flex' gap={1}>
          <ButtonComponent
            color='secondary'
            icon='arrow_back'
            onClick={handleResetPlaylist}
            variant='contained'
          >
            {translate.t('generic.labels.back')}
          </ButtonComponent>
          <ButtonComponent
            icon='refresh'
            onClick={handleRefreshPlaylist}
            variant='contained'
          >
            {translate.t('generic.labels.refresh')}
          </ButtonComponent>
          <ButtonComponent
            icon='upload'
            onClick={() => setIsDialogOpen(true)}
            variant='contained'
          >
            {translate.t('generic.labels.export')}
          </ButtonComponent>
        </Box>
      </Box>

      <TrackListComponent />

      <PlaylistExportDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </ScreenProvider>
  )
}

import { usePlaylistContext } from '@/application/contexts'
import { TrackDetailsComponent } from '@/presentation/components/Data/Track/Details/TrackDetailsComponent'
import { Box } from '@mui/material'

export const TrackListComponent: React.FC = () => {
  const { playlistData } = usePlaylistContext()

  return (
    <Box maxWidth='800px' width='100%'>
      {playlistData.map(track => (
        <Box display='flex' key={track.id}>
          <TrackDetailsComponent track={track} />
        </Box>
      ))}
    </Box>
  )
}

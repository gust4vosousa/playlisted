import { IconComponent } from '@/presentation/components/Data/Icon/IconComponent'
import { ITrackDetailsComponentProps } from '@/presentation/components/Data/Track/Details/TrackDetailsComponent.types'
import { Avatar, Box, Typography } from '@mui/material'

export const TrackDetailsComponent: React.FC<ITrackDetailsComponentProps> = ({
  size,
  track,
}) => (
  <Box alignItems='center' display='flex' gap={2}>
    <Avatar src={track?.album.images[0].url} variant='rounded'>
      <IconComponent icon='album' />
    </Avatar>

    <Box
      style={{
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
    >
      <Typography noWrap>{track?.name}</Typography>
      <Typography color='textSecondary'>
        {track?.artists.map(artist => artist.name).join('; ')}
      </Typography>
    </Box>
  </Box>
)

import Logo from '@/presentation/assets/logo.svg'
import { useScreenSize } from '@/presentation/hooks/UseScreenSize/UseScreenSize'
import { Box, Typography } from '@mui/material'

export const LogoComponent: React.FC = () => {
  const screenSize = useScreenSize()
  const size = screenSize === 'sm' ? 24 : 32

  return (
    <Box
      alignItems='center'
      display='flex'
      gap={1}
      style={{ userSelect: 'none' }}
    >
      <img
        alt='logo'
        height={size}
        src={Logo}
        style={{ pointerEvents: 'none' }}
      />
      <Typography
        color='primary'
        fontFamily='Major Mono Display'
        fontSize={size}
      >
        PlAylistify
      </Typography>
    </Box>
  )
}

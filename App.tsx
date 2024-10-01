import { RouterProvider } from 'react-router-dom'

import { router } from '@/application/routes/Routes'
import { AuthProvider } from '@/presentation/components/Providers/Auth/AuthProvider'
import { PlaylistProvider } from '@/presentation/components/Providers/Playlist/PlaylistProvider'
import { ThemeProvider } from '@/presentation/components/Providers/Theme/ThemeProvider'

export const App: React.FC = () => (
  <ThemeProvider>
    <AuthProvider>
      <PlaylistProvider>
        <RouterProvider router={router} />
      </PlaylistProvider>
    </AuthProvider>
  </ThemeProvider>
)

import { PropsWithChildren } from 'react'

import { PlaylistContext } from '@/application/contexts'
import { usePlaylistProvider } from '@/presentation/components/Providers/Playlist/PlaylistProvider.rules'

export const PlaylistProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { playlistContextValue } = usePlaylistProvider()

  return (
    <PlaylistContext.Provider value={playlistContextValue}>
      {children}
    </PlaylistContext.Provider>
  )
}

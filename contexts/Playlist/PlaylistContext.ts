import { createContext, useContext } from 'react'

import { IPlaylistContext } from '@/application/contexts/Playlist/PlaylistContext.types'

export const PlaylistContext = createContext<IPlaylistContext>({
  handleCreatePlaylist: () => {},
  handleExportPlaylist: () => {},
  handleRefreshPlaylist: () => {},
  handleResetPlaylist: () => {},
  isCreatePlaylistBusy: false,
  isExportPlaylistBusy: false,
  playlistData: [],
  playlistUrl: null,
})

export const usePlaylistContext = () => useContext(PlaylistContext)

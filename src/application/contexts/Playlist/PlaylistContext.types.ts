import { IArtist, ITrack } from '@/domain/entities'
import { PlaylistCreateNamespace } from '@/domain/usecases/Playlist'

export interface IPlaylistContext {
  handleCreatePlaylist: (params: IPlaylistConfig) => void
  handleExportPlaylist: (params: PlaylistCreateNamespace.IRequest) => void
  handleRefreshPlaylist: () => void
  handleResetPlaylist: () => void
  isCreatePlaylistBusy: boolean
  isExportPlaylistBusy: boolean
  playlistData: ITrack[]
  playlistUrl: string | null
}

export interface IPlaylistConfig {
  artists: IArtist[]
  similarArtists: boolean
  size: number
}

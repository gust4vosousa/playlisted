import { useCallback, useState } from 'react'

import {
  IPlaylistConfig,
  IPlaylistContext,
} from '@/application/contexts/Playlist/PlaylistContext.types'
import {
  makePlaylistAddItemFactory,
  makePlaylistCreateFactory,
} from '@/application/factories/usecases/Playlist'
import {
  makeTrackRecommendationsFactory,
  makeTrackSearchFactory,
} from '@/application/factories/usecases/Track'
import { ITrack } from '@/domain/entities'
import { PlaylistCreateNamespace } from '@/domain/usecases/Playlist'
import { useHandleRequest } from '@/presentation/hooks/UseHandleRequest/UseHandleRequest'

const MAX_QUANTITY = 50

export const usePlaylistProvider = () => {
  const [currentConfig, setCurrentConfig] = useState<IPlaylistConfig | null>(
    null,
  )

  const [playlistData, setPlaylistData] = useState<
    IPlaylistContext['playlistData']
  >([])

  const [playlistUrl, setPlaylistUrl] =
    useState<IPlaylistContext['playlistUrl']>(null)

  const trackSearch = useHandleRequest(makeTrackSearchFactory())
  const trackRecommendations = useHandleRequest(
    makeTrackRecommendationsFactory(),
  )
  const playlistAddItem = useHandleRequest(makePlaylistAddItemFactory())
  const playlistCreate = useHandleRequest(makePlaylistCreateFactory())

  const isCreatePlaylistBusy = trackSearch.isBusy || trackRecommendations.isBusy
  const isExportPlaylistBusy = playlistCreate.isBusy || playlistAddItem.isBusy

  const handleGetArtistTracks = useCallback(
    async ({ artists, size }: IPlaylistConfig) => {
      const tracks: ITrack[] = []

      const promises = artists.map(async artist => {
        let limit = Math.ceil(size / artists.length)
        let offset = 0

        while (limit > 0) {
          const response = await trackSearch.handle({
            limit: limit > MAX_QUANTITY ? MAX_QUANTITY : limit,
            offset,
            query: artist.name,
          })

          tracks.push(...(response?.tracks.items || []))

          limit -= MAX_QUANTITY
          offset += MAX_QUANTITY
        }
      })

      await Promise.all(promises)

      return tracks
    },
    [trackSearch],
  )

  const handleGetTrackRecommendations = async ({
    artists,
    similarArtists,
    size,
  }: IPlaylistConfig) => {
    if (!similarArtists) {
      return []
    }

    const response = await trackRecommendations.handle({
      artistIds: artists.map(artist => artist.id),
      limit: size,
    })

    return response?.tracks || []
  }

  const handleExportPlaylist = async (
    params: PlaylistCreateNamespace.IRequest,
  ) => {
    const playlistDetails = await playlistCreate.handle(params)

    if (playlistDetails) {
      await playlistAddItem.handle({
        playlistId: playlistDetails.id,
        tracks: playlistData.map(track => track.uri),
      })

      setPlaylistUrl(playlistDetails.external_urls.spotify)
    }
  }

  const handleShuffleTracks = (tracks: ITrack[], size: number) => {
    return tracks
      .map(track => ({ track, sortValue: Math.random() }))
      .sort((a, b) => a.sortValue - b.sortValue)
      .map(({ track }) => track)
      .slice(0, size)
  }

  const handleResetPlaylist = () => {
    setPlaylistData([])
    setPlaylistUrl('')
  }

  const handleCreatePlaylist = async (config: IPlaylistConfig) => {
    handleResetPlaylist()

    const artistTracks = await handleGetArtistTracks(config)
    const trackRecommendations = await handleGetTrackRecommendations(config)
    const shuffledTracks = handleShuffleTracks(
      [...artistTracks, ...trackRecommendations],
      config.size,
    )

    setCurrentConfig(config)
    setPlaylistData(shuffledTracks)
  }

  const handleRefreshPlaylist = () => {
    if (currentConfig) {
      handleCreatePlaylist(currentConfig)
    }
  }

  const playlistContextValue: IPlaylistContext = {
    handleCreatePlaylist,
    handleExportPlaylist,
    handleRefreshPlaylist,
    handleResetPlaylist,
    isCreatePlaylistBusy,
    isExportPlaylistBusy,
    playlistData,
    playlistUrl,
  }

  return { playlistContextValue }
}

import { IAlbum, IArtist } from '@/domain/entities'

export interface ITrack {
  album: IAlbum
  artists: IArtist[]
  duration_ms: number
  explicit: boolean
  external_urls: {
    spotify: string
  }
  href: string
  id: string
  is_playable: boolean
  name: string
  preview_url: string
  track_number: number
  type: string
  uri: string
}

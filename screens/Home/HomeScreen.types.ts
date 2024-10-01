import { IArtist } from '@/domain/entities'

export interface IPlaylistForm {
  artists: IArtist[]
  similarArtists: boolean
  size: number
}

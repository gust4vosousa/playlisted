import { IImage } from '@/domain/entities'

export interface IAlbum {
  id: string
  name: string
  images: IImage[]
}

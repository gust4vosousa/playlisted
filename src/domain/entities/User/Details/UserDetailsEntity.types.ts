import { IImage } from '@/domain/entities'

export interface IUserDetails {
  country: string
  display_name: string
  id: string
  images: IImage[]
}

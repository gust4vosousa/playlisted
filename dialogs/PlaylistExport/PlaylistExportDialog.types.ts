import { PlaylistCreateNamespace } from '@/domain/usecases/Playlist'
import { IDialogComponentProps } from '@/presentation/components/Data/Dialog/DialogComponent.types'

export type TPlaylistExportDialogProps = Omit<IDialogComponentProps, 'actions'>

export type TPlaylistExportForm = Omit<
  PlaylistCreateNamespace.IRequest,
  'userId'
>

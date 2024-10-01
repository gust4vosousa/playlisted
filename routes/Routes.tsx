import { Navigate, RouteObject, createHashRouter } from 'react-router-dom'

import { HomeScreen } from '@/presentation/screens/Home/HomeScreen'
import { LoginScreen } from '@/presentation/screens/Login/LoginScreen'
import { PlaylistScreen } from '@/presentation/screens/Playlist/PlaylistScreen'

const applicationRoutes: RouteObject[] = [
  {
    path: '/*',
    element: <Navigate to='/home' replace />,
  },
  {
    path: '/login',
    element: <LoginScreen />,
  },
  {
    path: '/home',
    element: <HomeScreen />,
  },
  {
    path: '/playlist',
    element: <PlaylistScreen />,
  },
]

export const router = createHashRouter(applicationRoutes)

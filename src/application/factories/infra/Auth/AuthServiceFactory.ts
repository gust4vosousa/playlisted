import { AuthService } from '@/infra/Auth/AuthService'

export const makeAuthServiceFactory = () => new AuthService()

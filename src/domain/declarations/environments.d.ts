declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CLIENT_ID: string
      CLIENT_SECRET: string
      REDIRECT_URI: string
      SPOTIFY_API_URL: string
      SPOTIFY_ACCOUNTS_API_URL: string
    }
  }
}

export {}

import axios from 'axios'

export class AuthService {
  private codeVerifier: string | null = null
  private readonly scopes =
    'user-read-private user-read-email playlist-modify-public'

  private readonly generateCodeVerifier = async () => {
    if (!window.crypto || !window.crypto.subtle) {
      throw new Error(
        'Your browser does not support the necessary cryptographic functions.',
      )
    }

    const codeVerifier = crypto
      .getRandomValues(new Uint8Array(64))
      .reduce(
        (prev, current) =>
          prev +
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'[
            current % 62
          ],
        '',
      )

    const codeChallenge = btoa(
      String.fromCharCode.apply(
        null,
        Array.from(
          new Uint8Array(
            await window.crypto.subtle.digest(
              'SHA-256',
              new TextEncoder().encode(codeVerifier),
            ),
          ),
        ),
      ),
    )
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '')

    localStorage.setItem('code_verifier', codeVerifier)
    localStorage.setItem('code_challenge', codeChallenge)
  }

  private readonly getAuthUrl = async () => {
    if (!this.codeVerifier) await this.generateCodeVerifier()

    const codeChallenge = localStorage.getItem('code_challenge')
    const state = crypto.randomUUID()
    localStorage.setItem('auth_state', state)

    const authUrl = `${
      process.env.SPOTIFY_ACCOUNTS_API_URL
    }/authorize?response_type=code&client_id=${
      process.env.CLIENT_ID
    }&scope=${encodeURIComponent(
      this.scopes,
    )}&redirect_uri=${encodeURIComponent(
      process.env.REDIRECT_URI,
    )}&code_challenge_method=S256&code_challenge=${codeChallenge}&state=${state}&show_dialog=true`

    return authUrl
  }

  private readonly requestAccessToken = async (authCode: string) => {
    const codeVerifier = localStorage.getItem('code_verifier')

    try {
      const response = await axios.post(
        `${process.env.SPOTIFY_ACCOUNTS_API_URL}/api/token`,
        new URLSearchParams({
          grant_type: 'authorization_code',
          code: authCode,
          redirect_uri: process.env.REDIRECT_URI,
          client_id: process.env.CLIENT_ID,
          code_verifier: codeVerifier || '',
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      )

      const { access_token, refresh_token, expires_in } = response.data

      localStorage.setItem('access_token', access_token)
      localStorage.setItem('refresh_token', refresh_token)
      localStorage.setItem(
        'expires_in',
        (Date.now() + expires_in * 1000).toString(),
      )

      localStorage.removeItem('auth_state')
      window.location.reload()
    } catch (error) {
      console.error('Error while requesting access token:', error)
    }
  }

  private readonly refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refresh_token')

    if (!refreshToken) {
      this.handleLogin()
      return
    }

    try {
      const response = await axios.post(
        `${process.env.SPOTIFY_ACCOUNTS_API_URL}/api/token`,
        new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
          client_id: process.env.CLIENT_ID,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      )

      const { access_token, expires_in } = response.data

      localStorage.setItem('access_token', access_token)
      localStorage.setItem(
        'expires_in',
        (Date.now() + expires_in * 1000).toString(),
      )
    } catch (error) {
      console.error('Error while refreshing access token:', error)
      this.handleLogin()
    }
  }

  public readonly getAccessToken = async () => {
    const accessToken = localStorage.getItem('access_token')
    const expiresIn = localStorage.getItem('expires_in')

    if (accessToken && expiresIn) {
      if (Date.now() < parseInt(expiresIn)) {
        return accessToken
      }

      await this.refreshAccessToken()
      return localStorage.getItem('access_token')
    }

    return null
  }

  private readonly checkForAuthCode = (url: string) => {
    try {
      const urlParams = new URLSearchParams(new URL(url).search)
      const authCode = urlParams.get('code')
      const state = urlParams.get('state')

      if (state === localStorage.getItem('auth_state')) {
        return authCode
      }
    } catch {
      return null
    }

    return null
  }

  public readonly handleLogin = async () => {
    const authUrl = await this.getAuthUrl()

    const width = 600
    const height = 800
    const left = window.screen.width / 2 - width / 2
    const top = window.screen.height / 2 - height / 2

    const popup = window.open(
      authUrl,
      'Spotify Auth',
      `width=${width},height=${height},top=${top},left=${left}`,
    )

    if (popup) {
      const interval = setInterval(() => {
        try {
          const authCode = this.checkForAuthCode(popup.location.href)

          if (authCode) {
            clearInterval(interval)
            popup.close()
            this.requestAccessToken(authCode)
          }
        } catch {}

        if (popup.closed) {
          clearInterval(interval)
        }
      }, 500)
    }

    const fallbackInterval = setInterval(() => {
      const authCode = this.checkForAuthCode(window.location.href)

      if (authCode) {
        clearInterval(fallbackInterval)
        this.requestAccessToken(authCode)
      }
    }, 500)
  }

  public readonly handleLogout = () => {
    localStorage.clear()
    window.location.reload()
  }

  public readonly startTokenRefresh = () => {
    const expiresIn = localStorage.getItem('expires_in')
    if (expiresIn) {
      const timeout = parseInt(expiresIn) - Date.now() - 60000

      if (timeout > 0) {
        setTimeout(() => {
          this.refreshAccessToken()
        }, timeout)
      }
    }
  }
}

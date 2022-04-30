import { useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import spotifyApi from '../lib/spotify'

function useSpotify() {
  const { data } = useSession()

  useEffect(() => {
    if (data) {
      if (data.error === 'RefreshAccessToken Error') {
        signIn()
      }
      if (data.user) {
        const { accessToken } = data.user as any
        spotifyApi.setAccessToken(accessToken)
      }
    }
  }, [data])

  return spotifyApi
}
export default useSpotify

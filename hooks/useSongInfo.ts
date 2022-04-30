import { useEffect, useState } from 'react'
import useSpotify from './useSpotify'
import { useRecoilState } from 'recoil'
import { currentTrackIdState } from '../atoms/songAtom'

function useSongInfo() {
  const spotifyApi = useSpotify()
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState)
  const [songInfo, setSongInfo] = useState<any>(null)

  useEffect(() => {
    const getSongInfo = async () => {
      if (currentTrackId) {
        const trackInfo = await fetch(
          `https://api.spotify.com/v1/tracks/${currentTrackId}`,
          {
            headers: {
              Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
            },
          }
        )
        const response = await trackInfo.json()
        setSongInfo(response)
      }
    }

    getSongInfo()
  }, [currentTrackId, spotifyApi])

  return songInfo
}
export default useSongInfo

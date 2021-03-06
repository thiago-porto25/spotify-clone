import { useRecoilState } from 'recoil'

import useSpotify from '../hooks/useSpotify'
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom'
import { millisToMinutes } from '../lib/time'

interface SongProps {
  track: any
  order: number
}

export const Song: React.FC<SongProps> = ({ track, order }) => {
  const [__, setCurrentTrackId] = useRecoilState(currentTrackIdState)
  const [_, setIsPlaying] = useRecoilState(isPlayingState)
  const spotifyApi = useSpotify()

  const playSong = () => {
    setCurrentTrackId(track.track.id)
    setIsPlaying(true)
    spotifyApi
      .play({
        uris: [track.track.uri],
      })
      .catch(() =>
        alert(
          'Make sure you are logged in into a Spotify web/mobile/desktop app with a Premium account'
        )
      )
  }

  return (
    <div
      onClick={playSong}
      className="hover: grid cursor-pointer grid-cols-2 rounded-lg py-4 px-5 text-gray-500 hover:bg-gray-900"
    >
      <div className="flex items-center space-x-4">
        <p>{order}</p>
        <img
          className="h-10 w-10"
          loading="lazy"
          src={track.track.album.images[0].url}
          alt={track.track.name}
        />
        <div>
          <p className=" w-36 truncate text-white lg:w-64">
            {track.track.name}
          </p>
          <p className="w-40">{track.track.artists[0].name}</p>
        </div>
      </div>
      <div className="ml-auto flex items-center justify-between md:ml-0">
        <p className="hidden w-40 md:inline">{track.track.album.name}</p>
        <p>{millisToMinutes(track.track.duration_ms)}</p>
      </div>
    </div>
  )
}

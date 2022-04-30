import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRecoilState } from 'recoil'

import useSpotify from '../hooks/useSpotify'
import { playlistIdState } from '../atoms/playlistAtom'

export const Sidebar: React.FC = () => {
  const { data } = useSession()
  const spotifyApi = useSpotify()
  const [playlists, setPlaylists] = useState<any[]>([])
  const [_, setPlaylistId] = useRecoilState(playlistIdState)

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((playlists) => {
        setPlaylists(playlists.body.items)
      })
    }
  }, [data, spotifyApi])

  return (
    <div className="hidden h-screen overflow-y-scroll border-r border-gray-900 p-5 pb-36 text-xs text-gray-500 scrollbar-hide sm:min-w-[12rem] sm:max-w-[12rem] md:inline-flex lg:min-w-[15rem] lg:max-w-[15rem] lg:text-sm">
      <div className="w-full space-y-4">
        <div className="flex items-center space-x-2 text-lg text-white">
          <h1>Your Playlists</h1>
        </div>

        <hr className="border-t-[0.1px] border-gray-900" />

        {playlists?.map((playlist) => (
          <p
            key={playlist.id}
            className="w-full cursor-pointer truncate hover:text-white"
            onClick={() => setPlaylistId(playlist.id)}
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  )
}

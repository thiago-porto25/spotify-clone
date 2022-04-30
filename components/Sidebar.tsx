import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRecoilState } from 'recoil'
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
} from '@heroicons/react/solid'

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
    <div className="hidden h-screen overflow-y-scroll border-r border-gray-900 p-5 text-xs text-gray-500 scrollbar-hide sm:min-w-[12rem] sm:max-w-[12rem] md:inline-flex lg:min-w-[15rem] lg:max-w-[15rem] lg:text-sm">
      <div className="w-full space-y-4">
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>

        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>

        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>

        <hr className="border-t-[0.1px] border-gray-900" />

        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>

        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="h-5 w-5" />
          <p>Liked Songs</p>
        </button>

        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="h-5 w-5" />
          <p>Your Episodes</p>
        </button>

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

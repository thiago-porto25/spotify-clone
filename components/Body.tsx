import { useEffect, useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { shuffle } from 'lodash'
import Image from 'next/image'
import { ChevronDownIcon } from '@heroicons/react/solid'

import { playlistIdState, playlistState } from '../atoms/playlistAtom'
import useSpotify from '../hooks/useSpotify'
import { Songs } from './Songs'

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
]

export const Body: React.FC = () => {
  const { data } = useSession()
  const [color, setColor] = useState('')
  const spotifyApi = useSpotify()
  const playlistId = useRecoilValue(playlistIdState)
  const [playlist, setPlaylist] = useRecoilState<any>(playlistState)

  useEffect(() => {
    setColor(shuffle(colors)[0])
  }, [playlistId])

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((playlist) => {
        setPlaylist(playlist.body)
      })
      .catch((err) => {
        console.error('Something went wrong', err)
      })
  }, [playlistId, spotifyApi, data])

  return (
    <div className="relative h-screen flex-grow overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div
          onClick={() => signOut()}
          className="flex cursor-pointer items-center space-x-3 rounded-full bg-black p-1 pr-2 text-white opacity-90 hover:opacity-80"
        >
          <Image
            className="h-10 w-10 rounded-full"
            src={data?.user?.image || 'images/default-user.png'}
            alt="User avatar"
            height={40}
            width={40}
          />
          <h2>{data?.user?.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>
      <section
        className={`flex h-80 items-end space-x-7 bg-gradient-to-b ${color} to-black p-8 text-white`}
      >
        <img
          loading="lazy"
          className="h-44 w-44 shadow-2xl"
          src={playlist?.images?.[0]?.url}
          alt={playlist?.name || 'Playlist'}
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl font-bold md:text-3xl xl:text-5xl">
            {playlist?.name}
          </h1>
        </div>
      </section>

      <Songs />
    </div>
  )
}

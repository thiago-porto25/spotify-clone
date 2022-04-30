import React, { useCallback, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRecoilState } from 'recoil'
import { debounce } from 'lodash'
import { PlayIcon, PauseIcon, VolumeUpIcon } from '@heroicons/react/solid'
import { VolumeUpIcon as VolumeDownIcon } from '@heroicons/react/outline'

import useSongInfo from '../hooks/useSongInfo'
import useSpotify from '../hooks/useSpotify'
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom'

export const Player: React.FC = () => {
  const spotifyApi = useSpotify()
  const { data } = useSession()
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState<any>(currentTrackIdState)
  const [volume, setVolume] = useState(50)
  const songInfo = useSongInfo()

  const handlePlayPause = () => {
    spotifyApi
      .getMyCurrentPlaybackState()
      .then((res) => {
        if (res.body.is_playing) {
          spotifyApi.pause()
          setIsPlaying(false)
        } else {
          spotifyApi.play()
          setIsPlaying(true)
        }
      })
      .catch(() =>
        alert(
          'Make sure you are logged in into a Spotify web/mobile/desktop app with a Premium account'
        )
      )
  }

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((response) => {
        setCurrentTrackId(response.body?.item?.id)

        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing)
        })
      })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseInt(e.target.value))
  }

  const debouncedAdjustVolume = useCallback(
    debounce((value) => {
      spotifyApi.setVolume(value).catch((err) => {
        console.error(err)
      })
    }, 400),
    []
  )

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong()
      setVolume(50)
    }
  }, [currentTrackId, spotifyApi, data])

  useEffect(() => {
    if (volume > 0 && volume <= 100) {
      debouncedAdjustVolume(volume)
    }
  }, [volume])

  return (
    <div className="grid h-24 w-full grid-cols-3 bg-gradient-to-b from-black to-gray-900 px-2 text-xs text-white md:px-8 md:text-base">
      <div className="flex items-center space-x-4">
        <img
          className="hidden h-10 w-10 md:inline"
          loading="lazy"
          src={songInfo?.album.images?.[0]?.url}
          alt={songInfo?.name}
        />
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>

      <div className="flex items-center justify-evenly">
        {isPlaying ? (
          <PauseIcon onClick={handlePlayPause} className="button h-10 w-10" />
        ) : (
          <PlayIcon onClick={handlePlayPause} className="button h-10 w-10" />
        )}
      </div>

      <div className="flex items-center justify-end space-x-3 md:space-x-4">
        <VolumeDownIcon
          onClick={() => volume >= 10 && setVolume((prev) => prev - 10)}
          className="button"
        />
        <input
          className="w-14 cursor-pointer accent-[#18d86f] md:w-20"
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={handleChange}
        />
        <VolumeUpIcon
          onClick={() => volume <= 90 && setVolume((prev) => prev + 10)}
          className="button"
        />
      </div>
    </div>
  )
}

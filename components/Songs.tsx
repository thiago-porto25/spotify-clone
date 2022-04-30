import { useRecoilValue } from 'recoil'

import { Song } from './Song'
import { playlistState } from '../atoms/playlistAtom'

export const Songs: React.FC = () => {
  const playlist = useRecoilValue<any>(playlistState)

  return (
    <ul className="flex flex-col space-y-1 px-8 pb-28 text-white">
      {playlist?.tracks.items.map((track: any, index: number) => (
        <li className="w-full" key={track.track.id}>
          <Song track={track} order={index + 1} />
        </li>
      ))}
    </ul>
  )
}

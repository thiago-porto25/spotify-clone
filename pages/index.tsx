import type { NextPage } from 'next'
import Head from 'next/head'

import { Body } from '../components/Body'
import { Player } from '../components/Player'
import { Sidebar } from '../components/Sidebar'

const Home: NextPage = () => {
  return (
    <div className="h-screen overflow-hidden bg-black">
      <Head>
        <title>Spotify Player Manager</title>
      </Head>
      <main className="flex">
        <Sidebar />
        <Body />
      </main>
      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  )
}

export default Home

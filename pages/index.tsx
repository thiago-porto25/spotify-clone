import type { NextPage } from 'next'
import { getSession } from 'next-auth/react'
import { AppContext } from 'next/app'
import Head from 'next/head'
import { Body } from '../components/Body'
import { Sidebar } from '../components/Sidebar'

const Home: NextPage = () => {
  return (
    <div className="h-screen overflow-hidden bg-black">
      <Head>
        <title>Spotify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex">
        <Sidebar />
        <Body />
      </main>
    </div>
  )
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context)

  return {
    props: {
      session,
    },
  }
}

export default Home

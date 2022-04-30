import type { NextPage } from 'next'
import Image from 'next/image'
import Head from 'next/head'

import { getProviders, signIn } from 'next-auth/react'
import type { ClientSafeProvider } from 'next-auth/react'

import spotifyLogo from '../public/spotify-logo.png'

interface LoginProps {
  providers: ClientSafeProvider[]
}

const Login: NextPage<LoginProps> = ({ providers }) => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-black">
      <Head>
        <title>Login - Spotify</title>
        <meta name="description" content="Login to Spotify clone" />
      </Head>
      <main className="flex flex-grow flex-col items-center justify-center">
        <Image src={spotifyLogo} alt="spotify logo" height={200} width={200} />

        {Object.values(providers).map((provider) => (
          <div className="mt-8 flex justify-center" key={provider.name}>
            <button
              onClick={() => signIn(provider.id, { callbackUrl: '/' })}
              className="rounded-lg bg-[#18d860] p-4  hover:bg-[#2cdc6f] "
            >
              Login with {provider.name}
            </button>
          </div>
        ))}
      </main>
      <footer className="flex items-center justify-center bg-gray-900 p-4 text-white">
        <p>
          This app only works if the real spotify app or the web version is
          currently opened and signed in into an Premium account.
        </p>
      </footer>
    </div>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders()

  return {
    props: {
      providers,
    },
  }
}

export default Login

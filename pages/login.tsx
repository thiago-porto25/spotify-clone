import type { NextPage } from 'next'
import Image from 'next/image'
import Head from 'next/head'

import { getProviders, signIn } from 'next-auth/react'
import type { ClientSafeProvider } from 'next-auth/react'

interface LoginProps {
  providers: ClientSafeProvider[]
}

const Login: NextPage<LoginProps> = ({ providers }) => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-black">
      <Head>
        <title>Login - Spotify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <Image
          src="/images/spotify-logo.png"
          alt="spotify logo"
          height={200}
          width={200}
        />

        {Object.values(providers).map((provider) => (
          <div className="mt-8 flex justify-center" key={provider.name}>
            <button
              onClick={() => signIn(provider.id, { callbackUrl: '/' })}
              className="rounded-lg bg-[#18d860] p-4 text-white hover:bg-[#2cdc6f] "
            >
              Login with {provider.name}
            </button>
          </div>
        ))}
      </main>
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

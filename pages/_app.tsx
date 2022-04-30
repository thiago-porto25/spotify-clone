import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <RecoilRoot>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="This is a spotify player clone made for educational purposes"
          />
        </Head>
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  )
}

export default MyApp

import NextAuth from 'next-auth'
import type { JWT } from 'next-auth/jwt'
import SpotifyProvider from 'next-auth/providers/spotify'

import spotifyApi, { LOGIN_URL } from '../../../lib/spotify'

async function refreshAccessToken(token: JWT) {
  try {
    spotifyApi.setAccessToken(String(token.accessToken))
    spotifyApi.setRefreshToken(String(token.refreshToken))

    const { body: refreshToken } = await spotifyApi.refreshAccessToken()

    return {
      ...token,
      accessToken: refreshToken.access_token,
      refreshToken: refreshToken.refresh_token ?? token.refreshToken,
      accessTokenExpires: Date.now() + refreshToken.expires_in * 1000,
    }
  } catch (error) {
    console.error(error)
    return { ...token, error: 'RefreshAccessToken Error' }
  }
}

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET as string,
      authorization: LOGIN_URL,
    }),
  ],
  secret: process.env.JWT_SECRET as string,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: Number(account.expires_at) * 1000,
        }
      }

      if (Date.now() < Number(token.accessTokenExpires)) {
        return token
      }

      return await refreshAccessToken(token)
    },

    async session({ session, token }: any) {
      session.user.accessToken = token.accessToken
      session.user.refreshToken = token.refreshToken
      session.user.username = token.username

      return session
    },
  },
})

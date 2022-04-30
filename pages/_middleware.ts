import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET })
  const url = req.nextUrl.clone()

  if (token && req.nextUrl.pathname === '/login') {
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  if (
    req.nextUrl.pathname.includes('/api/auth') ||
    token ||
    req.nextUrl.pathname.includes('/_next') ||
    req.nextUrl.pathname.includes('/favicon.ico')
  ) {
    return NextResponse.next()
  }

  if (!token && req.nextUrl.pathname !== '/login') {
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

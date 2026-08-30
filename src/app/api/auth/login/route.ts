import { NextRequest, NextResponse } from 'next/server'
import { authenticate, signToken } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json()

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password required' }, { status: 400 })
    }

    const user = authenticate(username, password)
    if (!user) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 })
    }

    const token = signToken(user)

    const response = NextResponse.json({
      success: true,
      user: { id: user.id, username: user.username },
    })

    // Set HTTP-Only Cookie
    response.cookies.set('reiten_auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: 'Authentication failed', details: errorMsg }, { status: 500 })
  }
}

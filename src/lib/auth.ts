import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'
import { db } from './db'

const JWT_SECRET = process.env.JWT_SECRET || 'reitendrei_super_secret_jwt_key_2026_surfrock'

export interface AuthUser {
  id: number
  username: string
}

export function signToken(user: AuthUser): string {
  return jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: '7d',
  })
}

export function verifyToken(token: string): AuthUser | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthUser
  } catch {
    return null
  }
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('reiten_auth_token')?.value
  if (!token) return null
  return verifyToken(token)
}

export function authenticate(username: string, passwordPlain: string): AuthUser | null {
  const user = db.prepare('SELECT id, username, password_hash FROM users WHERE username = ?').get(username) as
    | { id: number; username: string; password_hash: string }
    | undefined

  if (!user) return null

  const isValid = bcrypt.compareSync(passwordPlain, user.password_hash)
  if (!isValid) return null

  return { id: user.id, username: user.username }
}

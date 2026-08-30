import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'
import { v4 as uuidv4 } from 'uuid'

export async function GET() {
  try {
    const releases = db.prepare('SELECT * FROM releases ORDER BY order_index ASC, created_at DESC').all()
    return NextResponse.json({ success: true, data: releases })
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: 'Failed to fetch releases', details: errorMsg }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { number, title, subtitle, year, cover_image, spotify_track_id, spotify_url, youtube_url, description, sonic_character, order_index } = body

    if (!title || !number || !cover_image || !spotify_track_id) {
      return NextResponse.json({ error: 'Number, title, cover image, and Spotify Track ID are required' }, { status: 400 })
    }

    const id = body.id || `release-${uuidv4().slice(0, 8)}`

    const stmt = db.prepare(`
      INSERT INTO releases (id, number, title, subtitle, year, cover_image, spotify_track_id, spotify_url, youtube_url, description, sonic_character, order_index)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)

    stmt.run(
      id,
      number,
      title,
      subtitle || '',
      year || new Date().getFullYear().toString(),
      cover_image,
      spotify_track_id,
      spotify_url || '',
      youtube_url || '',
      description || '',
      sonic_character || '',
      order_index || 0
    )

    const created = db.prepare('SELECT * FROM releases WHERE id = ?').get(id)
    return NextResponse.json({ success: true, data: created }, { status: 201 })
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: 'Failed to create release', details: errorMsg }, { status: 500 })
  }
}

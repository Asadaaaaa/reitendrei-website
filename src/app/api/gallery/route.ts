import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'
import { v4 as uuidv4 } from 'uuid'

export async function GET() {
  try {
    const gallery = db.prepare('SELECT * FROM gallery ORDER BY order_index ASC, created_at DESC').all()
    return NextResponse.json({ success: true, data: gallery })
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: 'Failed to fetch gallery', details: errorMsg }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { image, type, title, date, venue, description, aspect, order_index } = body

    if (!image || !title) {
      return NextResponse.json({ error: 'Image and title are required' }, { status: 400 })
    }

    const id = body.id || `gallery-${uuidv4().slice(0, 8)}`

    const stmt = db.prepare(`
      INSERT INTO gallery (id, image, type, title, date, venue, description, aspect, order_index)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)

    stmt.run(
      id,
      image,
      type || 'LIVE SESSION',
      title,
      date || '',
      venue || '',
      description || '',
      aspect || 'landscape',
      order_index || 0
    )

    const created = db.prepare('SELECT * FROM gallery WHERE id = ?').get(id)
    return NextResponse.json({ success: true, data: created }, { status: 201 })
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: 'Failed to add gallery photo', details: errorMsg }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'
import { v4 as uuidv4 } from 'uuid'

export async function GET() {
  try {
    const members = db.prepare('SELECT * FROM members ORDER BY order_index ASC, created_at ASC').all()
    return NextResponse.json({ success: true, data: members })
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: 'Failed to fetch members', details: errorMsg }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { name, role, instrument, image, bio, order_index } = body

    if (!name || !role || !instrument || !image) {
      return NextResponse.json({ error: 'Name, role, instrument, and image are required' }, { status: 400 })
    }

    const id = body.id || `member-${uuidv4().slice(0, 8)}`

    const stmt = db.prepare(`
      INSERT INTO members (id, name, role, instrument, image, bio, order_index)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `)

    stmt.run(
      id,
      name,
      role,
      instrument,
      image,
      bio || '',
      order_index || 0
    )

    const created = db.prepare('SELECT * FROM members WHERE id = ?').get(id)
    return NextResponse.json({ success: true, data: created }, { status: 201 })
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: 'Failed to create member', details: errorMsg }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    const body = await req.json()
    const { image, type, title, date, venue, description, aspect, order_index } = body

    const existing = db.prepare('SELECT * FROM gallery WHERE id = ?').get(id)
    if (!existing) {
      return NextResponse.json({ error: 'Gallery photo not found' }, { status: 404 })
    }

    const stmt = db.prepare(`
      UPDATE gallery
      SET image = ?, type = ?, title = ?, date = ?, venue = ?, description = ?, aspect = ?, order_index = ?
      WHERE id = ?
    `)

    stmt.run(
      image,
      type || 'LIVE SESSION',
      title,
      date || '',
      venue || '',
      description || '',
      aspect || 'landscape',
      order_index !== undefined ? order_index : 0,
      id
    )

    const updated = db.prepare('SELECT * FROM gallery WHERE id = ?').get(id)
    return NextResponse.json({ success: true, data: updated })
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: 'Failed to update gallery photo', details: errorMsg }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    db.prepare('DELETE FROM gallery WHERE id = ?').run(id)
    return NextResponse.json({ success: true, message: 'Deleted successfully' })
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: 'Failed to delete gallery photo', details: errorMsg }, { status: 500 })
  }
}

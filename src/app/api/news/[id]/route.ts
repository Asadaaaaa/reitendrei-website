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
    const { category, title, date, short_description, description, image, cta_label, cta_url, active, order_index } = body

    const existing = db.prepare('SELECT * FROM news WHERE id = ?').get(id)
    if (!existing) {
      return NextResponse.json({ error: 'News item not found' }, { status: 404 })
    }

    const stmt = db.prepare(`
      UPDATE news
      SET category = ?, title = ?, date = ?, short_description = ?, description = ?, image = ?, cta_label = ?, cta_url = ?, active = ?, order_index = ?
      WHERE id = ?
    `)

    stmt.run(
      category,
      title,
      date || null,
      short_description || null,
      description || null,
      image,
      cta_label || null,
      cta_url || null,
      active !== undefined ? (active ? 1 : 0) : 1,
      order_index !== undefined ? order_index : 0,
      id
    )

    const updated = db.prepare('SELECT * FROM news WHERE id = ?').get(id)
    return NextResponse.json({ success: true, data: updated })
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: 'Failed to update news item', details: errorMsg }, { status: 500 })
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
    db.prepare('DELETE FROM news WHERE id = ?').run(id)
    return NextResponse.json({ success: true, message: 'Deleted successfully' })
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: 'Failed to delete news item', details: errorMsg }, { status: 500 })
  }
}

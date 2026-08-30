import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'
import { v4 as uuidv4 } from 'uuid'

export async function GET() {
  try {
    const news = db.prepare('SELECT * FROM news ORDER BY order_index ASC, created_at DESC').all()
    return NextResponse.json({ success: true, data: news })
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: 'Failed to fetch news', details: errorMsg }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { category, title, date, short_description, description, image, cta_label, cta_url, active, order_index } = body

    if (!title || !category || !image) {
      return NextResponse.json({ error: 'Title, category, and image are required' }, { status: 400 })
    }

    const id = body.id || `news-${uuidv4().slice(0, 8)}`

    const stmt = db.prepare(`
      INSERT INTO news (id, category, title, date, short_description, description, image, cta_label, cta_url, active, order_index)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)

    stmt.run(
      id,
      category,
      title,
      date || null,
      short_description || null,
      description || null,
      image,
      cta_label || null,
      cta_url || null,
      active !== undefined ? (active ? 1 : 0) : 1,
      order_index || 0
    )

    const created = db.prepare('SELECT * FROM news WHERE id = ?').get(id)
    return NextResponse.json({ success: true, data: created }, { status: 201 })
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: 'Failed to create news item', details: errorMsg }, { status: 500 })
  }
}

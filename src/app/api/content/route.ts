import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const news = db.prepare('SELECT * FROM news ORDER BY order_index ASC, created_at DESC').all()
    const releases = db.prepare('SELECT * FROM releases ORDER BY order_index ASC, created_at DESC').all()
    const members = db.prepare('SELECT * FROM members ORDER BY order_index ASC, created_at ASC').all()
    const gallery = db.prepare('SELECT * FROM gallery ORDER BY order_index ASC, created_at DESC').all()
    const story = db.prepare('SELECT * FROM band_story WHERE id = ?').get('main') || null
    const rawSettings = db.prepare('SELECT key, value FROM site_settings').all() as { key: string; value: string }[]
    
    const settings: Record<string, string> = {}
    for (const item of rawSettings) {
      settings[item.key] = item.value
    }

    return NextResponse.json({
      success: true,
      data: {
        news,
        releases,
        members,
        gallery,
        story,
        settings,
      },
    })
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: 'Failed to fetch content', details: errorMsg }, { status: 500 })
  }
}

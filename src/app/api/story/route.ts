import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'

export async function GET() {
  try {
    const story = db.prepare('SELECT * FROM band_story WHERE id = ?').get('main')
    return NextResponse.json({ success: true, data: story })
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: 'Failed to fetch story', details: errorMsg }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { tagline, hero_image, story_p1, story_p2, quote, quote_author } = body

    const stmt = db.prepare(`
      INSERT INTO band_story (id, tagline, hero_image, story_p1, story_p2, quote, quote_author)
      VALUES ('main', ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        tagline = excluded.tagline,
        hero_image = excluded.hero_image,
        story_p1 = excluded.story_p1,
        story_p2 = excluded.story_p2,
        quote = excluded.quote,
        quote_author = excluded.quote_author
    `)

    stmt.run(
      tagline || '',
      hero_image || '',
      story_p1 || '',
      story_p2 || '',
      quote || '',
      quote_author || ''
    )

    const updated = db.prepare('SELECT * FROM band_story WHERE id = ?').get('main')
    return NextResponse.json({ success: true, data: updated })
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: 'Failed to update band story', details: errorMsg }, { status: 500 })
  }
}

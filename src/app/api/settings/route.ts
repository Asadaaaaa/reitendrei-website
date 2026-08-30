import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'

export async function GET() {
  try {
    const rawSettings = db.prepare('SELECT key, value FROM site_settings').all() as { key: string; value: string }[]
    const settings: Record<string, string> = {}
    for (const item of rawSettings) {
      settings[item.key] = item.value
    }
    return NextResponse.json({ success: true, data: settings })
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: 'Failed to fetch settings', details: errorMsg }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const upsertStmt = db.prepare(`
      INSERT INTO site_settings (key, value)
      VALUES (?, ?)
      ON CONFLICT(key) DO UPDATE SET value = excluded.value
    `)

    const updateMany = db.transaction((entries: [string, string][]) => {
      for (const [k, v] of entries) {
        upsertStmt.run(k, String(v))
      }
    })

    updateMany(Object.entries(body))

    const rawSettings = db.prepare('SELECT key, value FROM site_settings').all() as { key: string; value: string }[]
    const settings: Record<string, string> = {}
    for (const item of rawSettings) {
      settings[item.key] = item.value
    }

    return NextResponse.json({ success: true, data: settings })
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: 'Failed to update settings', details: errorMsg }, { status: 500 })
  }
}

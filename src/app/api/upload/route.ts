import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import fs from 'fs'
import { getCurrentUser } from '@/lib/auth'

const STORAGE_DIR = '/root/app/reitendrei/storage'

if (!fs.existsSync(STORAGE_DIR)) {
  fs.mkdirSync(STORAGE_DIR, { recursive: true })
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Determine extension
    const originalName = file.name || 'upload'
    let ext = path.extname(originalName).toLowerCase()
    if (!ext) {
      if (file.type.includes('webp')) ext = '.webp'
      else if (file.type.includes('png')) ext = '.png'
      else if (file.type.includes('jpeg') || file.type.includes('jpg')) ext = '.jpg'
      else if (file.type.includes('mp4')) ext = '.mp4'
      else if (file.type.includes('webm')) ext = '.webm'
      else ext = '.bin'
    }

    const uuidName = `${uuidv4()}${ext}`
    const targetFilePath = path.join(STORAGE_DIR, uuidName)

    const buffer = Buffer.from(await file.arrayBuffer())
    fs.writeFileSync(targetFilePath, buffer)

    const fileUrl = `/storage/${uuidName}`

    return NextResponse.json({
      success: true,
      url: fileUrl,
      filename: uuidName,
      size: file.size,
      type: file.type,
    })
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err)
    console.error('File upload error:', errorMsg)
    return NextResponse.json({ error: 'Failed to upload file', details: errorMsg }, { status: 500 })
  }
}

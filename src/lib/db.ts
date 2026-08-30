import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'
import bcrypt from 'bcryptjs'

const DB_DIR = path.resolve(process.cwd(), 'data')
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true })
}

const DB_PATH = path.join(DB_DIR, 'reitendrei.db')
export const db = new Database(DB_PATH)

// Enable WAL mode for high performance & concurrency
db.pragma('journal_mode = WAL')

export function initDatabase() {
  // 1. Users Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `)

  // 2. News Table (Section 1 - Update Slider)
  db.exec(`
    CREATE TABLE IF NOT EXISTS news (
      id TEXT PRIMARY KEY,
      category TEXT NOT NULL,
      title TEXT NOT NULL,
      date TEXT,
      short_description TEXT,
      description TEXT,
      image TEXT NOT NULL,
      cta_label TEXT,
      cta_url TEXT,
      active INTEGER DEFAULT 1,
      order_index INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `)

  // 3. Releases Table (Section 2 - Singles & Discography)
  db.exec(`
    CREATE TABLE IF NOT EXISTS releases (
      id TEXT PRIMARY KEY,
      number TEXT NOT NULL,
      title TEXT NOT NULL,
      subtitle TEXT NOT NULL,
      year TEXT NOT NULL,
      cover_image TEXT NOT NULL,
      spotify_track_id TEXT NOT NULL,
      spotify_url TEXT NOT NULL,
      youtube_url TEXT,
      description TEXT NOT NULL,
      sonic_character TEXT NOT NULL,
      order_index INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `)

  // 4. Band Members Table (Section 4 - Lineup)
  db.exec(`
    CREATE TABLE IF NOT EXISTS members (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      instrument TEXT NOT NULL,
      image TEXT NOT NULL,
      bio TEXT,
      order_index INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `)

  // 5. Gallery Table (Section 3 - Visual Archive)
  db.exec(`
    CREATE TABLE IF NOT EXISTS gallery (
      id TEXT PRIMARY KEY,
      image TEXT NOT NULL,
      type TEXT NOT NULL,
      title TEXT NOT NULL,
      date TEXT,
      venue TEXT,
      description TEXT,
      aspect TEXT DEFAULT 'landscape',
      order_index INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `)

  // 6. Site Settings Table (Contact & Social Links)
  db.exec(`
    CREATE TABLE IF NOT EXISTS site_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
  `)

  // 7. Band Story Table (Section 2 - Story & Profile)
  db.exec(`
    CREATE TABLE IF NOT EXISTS band_story (
      id TEXT PRIMARY KEY,
      tagline TEXT,
      hero_image TEXT,
      story_p1 TEXT,
      story_p2 TEXT,
      quote TEXT,
      quote_author TEXT
    );
  `)

  // Seed default admin user
  const adminUser = db.prepare('SELECT * FROM users WHERE username = ?').get('admin') as { id: number } | undefined
  const adminPasswordHash = bcrypt.hashSync('loreM@reitendrei@1321', 10)

  if (!adminUser) {
    db.prepare('INSERT INTO users (username, password_hash) VALUES (?, ?)').run('admin', adminPasswordHash)
  } else {
    // Ensure password matches the required credential
    db.prepare('UPDATE users SET password_hash = ? WHERE username = ?').run(adminPasswordHash, 'admin')
  }

  // Seed News if empty
  const newsCount = (db.prepare('SELECT COUNT(*) as count FROM news').get() as { count: number }).count
  if (newsCount === 0) {
    db.prepare(`
      INSERT INTO news (id, category, title, date, short_description, description, image, cta_label, cta_url, active, order_index)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 0)
    `).run(
      'news-001',
      'ANNIVERSARY',
      '2nd Aniversary',
      '29 August 2026',
      'Perayaan second anniversary reiten drei dengan live session di cafe terpingkal',
      'Perayaan second anniversary reiten drei dengan live session di cafe terpingkal',
      '/images/news/2nd-anniversary.webp',
      'View Details',
      '#',
    )
  }

  // Seed Releases if empty
  const releasesCount = (db.prepare('SELECT COUNT(*) as count FROM releases').get() as { count: number }).count
  if (releasesCount === 0) {
    const insertRelease = db.prepare(`
      INSERT INTO releases (id, number, title, subtitle, year, cover_image, spotify_track_id, spotify_url, youtube_url, description, sonic_character, order_index)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)

    insertRelease.run(
      'nelayan-pantai-sanur',
      '01',
      'Nelayan Pantai Sanur',
      'DEBUT SINGLE // SURF TRADITIONAL',
      '2024',
      '/images/releases/nelayan-pantai-sanur-official.webp',
      '7e5CxBlmNSDcT5nhwH3Tm2',
      'https://open.spotify.com/track/7e5CxBlmNSDcT5nhwH3Tm2',
      'https://youtu.be/coXlk7MLFUM',
      'Nelayan Pantai Sanur carries the story of maritime coastal life, salt-sprayed morning horizons, and the mystical ocean breeze of Sanur. Melodic surf guitars interplay with dynamic percussion rhythms to evoke rolling tidal breaks.',
      'Spring reverb chime, driving bassline, mid-tempo coastal rhythm.',
      0
    )

    insertRelease.run(
      'badjingan',
      '02',
      'BADJINGAN',
      'SOPHOMORE SINGLE // HIGH OCTANE SURF SATIRE',
      '2024',
      '/images/releases/badjingan-official.webp',
      '3MbvAPAVXKJMDrkgwMGw2a',
      'https://open.spotify.com/track/3MbvAPAVXKJMDrkgwMGw2a',
      '',
      'BADJINGAN delivers high-tempo surf punk satire infused with relentless picking, explosive percussion, and raw street energy. A biting narrative exploring urban absurdities wrapped in aggressive surf rock guitar twang.',
      'Fuzz-drenched surf leads, relentless galloping double-tempo drum beat.',
      1
    )
  }

  // Seed Members if empty
  const membersCount = (db.prepare('SELECT COUNT(*) as count FROM members').get() as { count: number }).count
  if (membersCount === 0) {
    const insertMember = db.prepare(`
      INSERT INTO members (id, name, role, instrument, image, bio, order_index)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `)

    const initialMembers = [
      {
        id: 'zein-ahza',
        name: 'Zein Ahza',
        role: 'LEAD VOCALS',
        instrument: 'VOCALS',
        image: '/images/members/zein-ahza.webp',
        bio: 'Frontman channeling raw vocal storytelling and infectious live energy.',
        order: 0,
      },
      {
        id: 'arda-raizza',
        name: 'Arda Raizza',
        role: 'GUITAR',
        instrument: 'GUITAR',
        image: '/images/members/arda-raizza.webp',
        bio: 'Crafting signature reverb-drenched tremolo riffs and driving guitar soundscapes.',
        order: 1,
      },
      {
        id: 'malique-rizki-mulia',
        name: 'Malique Rizki Mulia',
        role: 'BASS GUITAR',
        instrument: 'BASS',
        image: '/images/members/malique-rizki-mulia.webp',
        bio: 'Anchoring the heavy surf undertow with punchy rhythmic bass grooves.',
        order: 2,
      },
      {
        id: 'zarel-kaka',
        name: 'Zarel Kaka',
        role: 'DRUMS & PERCUSSION',
        instrument: 'DRUMS',
        image: '/images/members/zarel-kaka.webp',
        bio: 'The relentless tidal rhythm section powering dynamic transitions and explosive fills.',
        order: 3,
      },
      {
        id: 'javed-revanda',
        name: 'Javed Revanda',
        role: 'GUITAR',
        instrument: 'GUITAR',
        image: '/images/members/javed-revanda.webp',
        bio: 'Layering sharp surf melodic textures and explosive harmonic solos.',
        order: 4,
      },
    ]

    for (const m of initialMembers) {
      insertMember.run(m.id, m.name, m.role, m.instrument, m.image, m.bio, m.order)
    }
  }

  // Seed Band Story if empty
  const storyCount = (db.prepare('SELECT COUNT(*) as count FROM band_story').get() as { count: number }).count
  if (storyCount === 0) {
    db.prepare(`
      INSERT INTO band_story (id, tagline, hero_image, story_p1, story_p2, quote, quote_author)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      'main',
      'BORN IN THE CONCRETE OF BEKASI, RIDING THE ETHEREAL SURF OF THE INDONESIAN ARCHIPELAGO.',
      '/images/band/full-members.webp',
      'Formed on August 25, 2024, in Bekasi, West Java, Reiten Drei fuses classic 60s surf rock reverb twang with high-energy modern Indonesian indie rock edge and satirical narrative folklore.',
      'From the coastal folklore of Nelayan Pantai Sanur to the biting street-smart satire of BADJINGAN, each release is an explosive chapter in an evolving chronicle of sound, sea, and satire.',
      'WE DON’T JUST PLAY SURF ROCK — WE CHANNEL THE OCEAN THROUGH CONCRETE.',
      'REITEN DREI'
    )
  }

  // Seed Site Settings if empty
  const settingsCount = (db.prepare('SELECT COUNT(*) as count FROM site_settings').get() as { count: number }).count
  if (settingsCount === 0) {
    const insertSetting = db.prepare('INSERT INTO site_settings (key, value) VALUES (?, ?)')
    const defaultSettings: Record<string, string> = {
      brand_name: 'REITEN DREI',
      genre: 'SURF ROCK',
      origin: 'BEKASI, WEST JAVA, INDONESIA',
      founded_date: '2024-08-25',
      contact_email: 'reitendrei@gmail.com',
      contact_phone: '+62 812-3456-7890',
      contact_whatsapp: 'https://wa.me/6281234567890',
      contact_description: 'For bookings, press inquiries, music licensing, festival showcases, and collaboration opportunities.',
      instagram_url: 'https://instagram.com/reitendrei',
      youtube_url: 'https://youtube.com/@reitendreiofficial?si=k8AWNngPrkXf3kCk',
      tiktok_url: 'https://tiktok.com/@reiten.drei',
      spotify_url: 'https://open.spotify.com/track/7e5CxBlmNSDcT5nhwH3Tm2',
    }

    for (const [k, v] of Object.entries(defaultSettings)) {
      insertSetting.run(k, v)
    }
  }
}

// Auto-init on module import
initDatabase()

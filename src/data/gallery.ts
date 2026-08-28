export interface GalleryPhoto {
  id: string
  image: string
  type: string
  title: string
  date: string
  venue: string
  description: string
  aspect: 'landscape' | 'portrait' | 'square'
  accentColor?: string
}

export const liveGalleryPhotos: GalleryPhoto[] = [
  {
    id: 'live-001',
    image: '/images/gallery/live-01.webp',
    type: 'LIVE SESSION',
    title: 'Sanur Coastal Stage',
    date: 'August 2026',
    venue: 'Lorem Ipsum Venue',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    aspect: 'landscape',
    accentColor: '#38bdf8',
  },
  {
    id: 'live-002',
    image: '/images/gallery/live-02.webp',
    type: 'STAGE ACTION',
    title: 'Zarel Drum Session',
    date: '2026',
    venue: 'Lorem Ipsum Arena',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    aspect: 'portrait',
    accentColor: '#ff4d29',
  },
  {
    id: 'live-003',
    image: '/images/gallery/live-03.webp',
    type: 'GEAR & TONE',
    title: 'Reverb Twang Studio',
    date: '2026',
    venue: 'Lorem Ipsum Studio',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    aspect: 'square',
    accentColor: '#34d399',
  },
  {
    id: 'live-004',
    image: '/images/gallery/live-04.webp',
    type: 'LIVE ACTION',
    title: 'Undertow Bass Groove',
    date: '2026',
    venue: 'Lorem Ipsum Festival',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    aspect: 'landscape',
    accentColor: '#fbbf24',
  },
  {
    id: 'live-005',
    image: '/images/gallery/live-05.webp',
    type: 'STAGE ACTION',
    title: 'Vocal Intensity Live',
    date: '2026',
    venue: 'Lorem Ipsum Hall',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    aspect: 'square',
    accentColor: '#fb7185',
  },
  {
    id: 'live-006',
    image: '/images/gallery/live-06.webp',
    type: 'ATMOSPHERE',
    title: 'Crowd & Breakwaters',
    date: '2026',
    venue: 'Lorem Ipsum Ground',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse.',
    aspect: 'landscape',
    accentColor: '#38bdf8',
  },
  {
    id: 'live-007',
    image: '/images/gallery/live-01.webp',
    type: 'BACKSTAGE',
    title: 'Reverb Tuning Session',
    date: '2026',
    venue: 'Lorem Ipsum Stage',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    aspect: 'landscape',
    accentColor: '#38bdf8',
  },
  {
    id: 'live-008',
    image: '/images/gallery/live-02.webp',
    type: 'LIVE ACTION',
    title: 'Coastal Twang Jam',
    date: '2026',
    venue: 'Lorem Ipsum Park',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    aspect: 'portrait',
    accentColor: '#ff4d29',
  },
  {
    id: 'live-009',
    image: '/images/gallery/live-03.webp',
    type: 'STAGE ACTION',
    title: 'High Tide Energy',
    date: '2026',
    venue: 'Lorem Ipsum Space',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    aspect: 'square',
    accentColor: '#34d399',
  },
  {
    id: 'live-010',
    image: '/images/gallery/live-04.webp',
    type: 'STUDIO',
    title: 'Overdrive Chronicles',
    date: '2026',
    venue: 'Lorem Ipsum Studio',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    aspect: 'landscape',
    accentColor: '#fbbf24',
  },
  {
    id: 'live-011',
    image: '/images/gallery/live-05.webp',
    type: 'ATMOSPHERE',
    title: 'Sunset Surf Soundscape',
    date: '2026',
    venue: 'Lorem Ipsum Pavilion',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    aspect: 'square',
    accentColor: '#fb7185',
  },
  {
    id: 'live-012',
    image: '/images/gallery/live-06.webp',
    type: 'LIVE SESSION',
    title: 'Midnight Tremolo Waves',
    date: '2026',
    venue: 'Lorem Ipsum Club',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse.',
    aspect: 'landscape',
    accentColor: '#38bdf8',
  },
]

export interface GalleryItem {
  id: string
  title: string
  subtitle: string
  tag: string
  year: string
  description: string
  tone: string
}

export const galleryItems: GalleryItem[] = [
  {
    id: 'world-01',
    title: 'THE COASTAL TWANG',
    subtitle: 'Lorem Ipsum Dolor',
    tag: 'SONIC ESSENCE',
    year: '2024',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    tone: 'ocean',
  },
  {
    id: 'world-02',
    title: 'BEKASI UNDERGROUND',
    subtitle: 'Lorem Ipsum Sit',
    tag: 'ORIGIN STORY',
    year: '2024',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    tone: 'asphalt',
  },
  {
    id: 'world-03',
    title: 'THE SANUR TALISMAN',
    subtitle: 'Lorem Ipsum Amet',
    tag: 'FOLKLORE',
    year: '2024',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    tone: 'myth',
  },
]

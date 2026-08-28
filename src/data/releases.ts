export interface Release {
  id: string
  number: string
  title: string
  subtitle: string
  year: string
  spotifyTrackId: string
  spotifyUrl: string
  youtubeUrl?: string
  image: string
  description: string
  themes: string[]
  sonicCharacter: string
  visualAccent: string
  coverType?: 'sanur' | 'badjingan'
  bgGradient?: string
}

export const releases: Release[] = [
  {
    id: 'nelayan-pantai-sanur',
    number: '01',
    title: 'Nelayan Pantai Sanur',
    subtitle: 'A tale of waves, greed, and divine karma',
    year: '2024',
    spotifyTrackId: '7e5CxBlmNSDcT5nhwH3Tm2',
    spotifyUrl: 'https://open.spotify.com/track/7e5CxBlmNSDcT5nhwH3Tm2',
    youtubeUrl: 'https://youtu.be/coXlk7MLFUM',
    image: '/images/releases/nelayan-pantai-sanur-official.webp',
    description:
      'The song tells the story of a fisherman who receives a lucky talisman from the ocean, but becomes consumed by arrogance rather than humility and gratitude — until the deep sea reclaims what it once bestowed.',
    themes: ['Karma & Destiny', 'Ocean & Nature', 'Humility vs Greed', 'Social Criticism', 'Spiritual Symbolism'],
    sonicCharacter: 'Waves of roaring twang guitar riffs, warm and driving bass grooves, and unrelenting energetic drums.',
    visualAccent: '#0ea5e9',
    coverType: 'sanur',
    bgGradient: 'radial-gradient(ellipse at 70% 30%, rgba(14, 165, 233, 0.15) 0%, rgba(7, 9, 14, 0) 70%)',
  },
  {
    id: 'badjingan',
    number: '02',
    title: 'BADJINGAN',
    subtitle: 'Sharp satire meets blistering surf rock',
    year: '2024',
    spotifyTrackId: '3MbvAPAVXKJMDrkgwMGw2a',
    spotifyUrl: 'https://open.spotify.com/track/3MbvAPAVXKJMDrkgwMGw2a',
    image: '/images/releases/badjingan-official.webp',
    description:
      'A satirical and raw sonic assault addressing societal hypocrisy with unapologetic lyrics, absurd visual symbolism, and a fierce artistic identity featuring the iconic shrimp-head artwork.',
    themes: ['Satire & Rebellion', 'Sharp Social Commentary', 'Absurdist Visuals', 'Shrimp-Head Iconography', 'Raw Energy'],
    sonicCharacter: 'Fast-paced, aggressive surf rock tempos with razor-sharp vocal delivery and unapologetic garage attitude.',
    visualAccent: '#ff4d29',
    coverType: 'badjingan',
    bgGradient: 'radial-gradient(ellipse at 30% 70%, rgba(255, 77, 41, 0.18) 0%, rgba(7, 9, 14, 0) 70%)',
  },
]

export interface SocialLink {
  name: string
  handle: string
  url: string
  type: 'instagram' | 'spotify' | 'youtube' | 'tiktok' | 'email'
  description: string
}

export const socials: SocialLink[] = [
  {
    name: 'Instagram',
    handle: '@reitendrei',
    url: 'https://instagram.com/reitendrei',
    type: 'instagram',
    description: 'Visual diaries, live stage updates, and behind-the-scenes.',
  },
  {
    name: 'Spotify',
    handle: 'Reiten Drei',
    url: 'https://open.spotify.com/track/7e5CxBlmNSDcT5nhwH3Tm2',
    type: 'spotify',
    description: 'Official discography, singles, and curated sonic journeys.',
  },
  {
    name: 'YouTube',
    handle: 'Reiten Drei',
    url: 'https://youtube.com/@reitendrei',
    type: 'youtube',
    description: 'Music videos, live sessions, and documentary archives.',
  },
  {
    name: 'TikTok',
    handle: 'reiten.drei',
    url: 'https://tiktok.com/@reiten.drei',
    type: 'tiktok',
    description: 'Raw rehearsal moments, satire, and youth energy.',
  },
]

export const contactInfo = {
  email: 'reitendrei@gmail.com',
  booking: 'reitendrei@gmail.com',
  origin: 'Bekasi, West Java, Indonesia',
  formedDate: '25 August 2024',
  genre: 'Indonesian Surf Rock',
}

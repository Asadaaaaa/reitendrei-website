export interface NewsItem {
  id: string
  category: string
  title: string
  date?: string
  shortDescription?: string
  description?: string
  image: string
  ctaLabel?: string
  ctaUrl?: string
  active?: boolean
}

export const newsItems: NewsItem[] = [
  {
    id: 'news-001',
    category: 'ANNIVERSARY / LIVE',
    title: '2nd Anniversary — Live at Cafe Terpingkal',
    date: 'August 2026',
    shortDescription: 'Perayaan 2nd Anniversary Reiten Drei dengan live session spesial dan energi surf rock di Cafe Terpingkal.',
    description:
      'Perayaan 2nd Anniversary Reiten Drei dengan penampilan live spesial membawakan repertoar surf rock berenergi tinggi di Cafe Terpingkal. Menampilkan hentakan ritme ombak pantai dan reverb twang khas.',
    image: '/images/news/2nd-anniversary.webp',
    ctaLabel: 'View Details',
    ctaUrl: '#',
    active: true,
  },
  {
    id: 'news-002',
    category: 'SONG RELEASE',
    title: 'BADJINGAN — Official Single',
    date: 'August 2024',
    shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Blistering fast-paced surf rock satire.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    image: '/images/news/news-02.webp',
    ctaLabel: 'Stream on Spotify',
    ctaUrl: 'https://open.spotify.com/track/3MbvAPAVXKJMDrkgwMGw2a',
    active: true,
  },
  {
    id: 'news-003',
    category: 'DEBUT SINGLE',
    title: 'Nelayan Pantai Sanur — Single',
    date: 'August 2024',
    shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    image: '/images/news/news-03.webp',
    ctaLabel: 'Listen on Spotify',
    ctaUrl: 'https://open.spotify.com/track/7e5CxBlmNSDcT5nhwH3Tm2',
    active: true,
  },
  {
    id: 'news-004',
    category: 'STUDIO ARCHIVE',
    title: 'Consectetur Adipiscing Elit',
    date: 'In Production',
    shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    image: '/images/news/news-04.webp',
    ctaLabel: 'Lorem Ipsum',
    ctaUrl: 'https://instagram.com/reitendrei',
    active: true,
  },
]

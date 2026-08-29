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
    category: 'ANNIVERSARY',
    title: '2nd Aniversary',
    date: '29 August 2026',
    shortDescription: 'Perayaan second anniversary reiten drei dengan live session di cafe terpingkal',
    description: 'Perayaan second anniversary reiten drei dengan live session di cafe terpingkal',
    image: '/images/news/2nd-anniversary.webp',
    ctaLabel: 'View Details',
    ctaUrl: '#',
    active: true,
  },
]

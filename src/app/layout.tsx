import type { Metadata, Viewport } from 'next'
import { Syne, Plus_Jakarta_Sans, Cinzel, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { SmoothScroll } from '@/components/motion/SmoothScroll'

const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-display',
  display: 'swap',
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['700', '900'],
  variable: '--font-serif-display',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-mono',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#07090e',
  colorScheme: 'dark',
}

export const metadata: Metadata = {
  title: 'Reiten Drei — Indonesian Surf Rock | Digital Archive',
  description:
    'Official digital exhibition, singles discography (Nelayan Pantai Sanur, BADJINGAN), and visual archive for Reiten Drei, an Indonesian Surf Rock band from Bekasi formed August 25, 2024.',
  keywords: [
    'Reiten Drei',
    'Indonesian Surf Rock',
    'Surf Rock Bekasi',
    'Nelayan Pantai Sanur',
    'BADJINGAN',
    'Indie Rock Indonesia',
    'Band Surf Rock Indonesia',
  ],
  authors: [{ name: 'Reiten Drei' }],
  metadataBase: new URL('https://reitendrei.sytes.net'),
  alternates: {
    canonical: 'https://reitendrei.sytes.net',
  },
  openGraph: {
    title: 'Reiten Drei — Indonesian Surf Rock | Digital Archive',
    description:
      'Formed in Bekasi on August 25, 2024. Channeling coastal folklore, sharp satire, and crashing reverb twangs.',
    url: 'https://reitendrei.sytes.net',
    siteName: 'Reiten Drei Official',
    images: [
      {
        url: '/images/band/band-hero.webp',
        width: 1200,
        height: 630,
        alt: 'Reiten Drei — Indonesian Surf Rock',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reiten Drei — Indonesian Surf Rock',
    description:
      'Official digital exhibition, singles discography, and visual archives for Reiten Drei from Bekasi.',
    images: ['/images/band/band-hero.webp'],
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/images/brand/logo.webp',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MusicGroup',
  name: 'Reiten Drei',
  url: 'https://reitendrei.sytes.net',
  logo: 'https://reitendrei.sytes.net/images/brand/logo.webp',
  image: 'https://reitendrei.sytes.net/images/band/band-hero.webp',
  description:
    'Indonesian Surf Rock band from Bekasi, Indonesia, formed on August 25, 2024.',
  genre: ['Surf Rock', 'Indie Rock', 'Garage Rock'],
  foundingDate: '2024-08-25',
  foundingLocation: {
    '@type': 'Place',
    name: 'Bekasi, West Java, Indonesia',
  },
  member: [
    { '@type': 'Person', name: 'Zein Ahza', roleName: 'Lead Vocals' },
    { '@type': 'Person', name: 'Arda Raizza', roleName: 'Guitar' },
    { '@type': 'Person', name: 'Malique Rizki Mulia', roleName: 'Bass Guitar' },
    { '@type': 'Person', name: 'Zarel Kaka', roleName: 'Drums & Percussion' },
    { '@type': 'Person', name: 'Javed Revanda', roleName: 'Guitar' },
  ],
  track: [
    {
      '@type': 'MusicRecording',
      name: 'Nelayan Pantai Sanur',
      url: 'https://open.spotify.com/track/7e5CxBlmNSDcT5nhwH3Tm2',
      duration: 'PT3M45S',
      datePublished: '2024',
    },
    {
      '@type': 'MusicRecording',
      name: 'BADJINGAN',
      url: 'https://open.spotify.com/track/3MbvAPAVXKJMDrkgwMGw2a',
      duration: 'PT3M12S',
      datePublished: '2024',
    },
  ],
  sameAs: [
    'https://instagram.com/reitendrei',
    'https://youtube.com/@reitendreiofficial?si=k8AWNngPrkXf3kCk',
    'https://tiktok.com/@reiten.drei',
    'https://open.spotify.com/track/7e5CxBlmNSDcT5nhwH3Tm2',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="id"
      className={`${syne.variable} ${plusJakartaSans.variable} ${cinzel.variable} ${jetbrainsMono.variable} dark`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background text-foreground antialiased selection:bg-accent selection:text-white">
        {/* Analog Film Grain Texture Overlay */}
        <div className="film-grain" aria-hidden="true" />

        {/* Desktop Cinematic Custom Cursor */}
        <CustomCursor />

        {/* Smooth Lenis Scrolling Provider */}
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}

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
  ],
  authors: [{ name: 'Reiten Drei' }],
  metadataBase: new URL('https://reitendrei.sytes.net'),
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
  },
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

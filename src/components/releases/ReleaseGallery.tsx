'use client'
import { useState, useEffect } from 'react'
import { releases as defaultReleases, type Release } from '../../data/releases'
import { ReleaseCard } from './ReleaseCard'
import { ReleaseDetailModal } from './ReleaseDetailModal'
import { Reveal } from '../motion/Reveal'
import { Disc3 } from 'lucide-react'

export function ReleaseGallery() {
  const [items, setItems] = useState<Release[]>(defaultReleases)
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(null)

  useEffect(() => {
    fetch('/api/releases')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data && data.data.length > 0) {
          const mapped: Release[] = data.data.map((row: any) => ({
            id: row.id,
            number: row.number,
            title: row.title,
            subtitle: row.subtitle,
            year: row.year,
            coverImage: row.cover_image,
            spotifyTrackId: row.spotify_track_id,
            spotifyUrl: row.spotify_url,
            youtubeUrl: row.youtube_url || undefined,
            description: row.description,
            sonicCharacter: row.sonic_character,
            themes: [],
          }))
          setItems(mapped)
        }
      })
      .catch((err) => console.error('Failed to load releases:', err))
  }, [])

  return (
    <div id="releases" className="space-y-5">
      {/* Sub-header */}
      <Reveal direction="up">
        <div className="flex items-center justify-between pb-4 border-b border-white/8">
          <div className="flex items-center gap-2 font-mono text-[10px] text-accent uppercase tracking-widest">
            <Disc3 size={13} />
            <span>DISCOGRAPHY // RELEASES</span>
          </div>
          <span className="font-mono text-[10px] text-white/30">
            {items.length} SINGLES
          </span>
        </div>
      </Reveal>

      {/* Symmetrical Grid of Artwork Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 items-stretch">
        {items.map((release, idx) => (
          <Reveal key={release.id} direction="up" delay={idx * 0.1} className="h-full">
            <ReleaseCard
              release={release}
              onSelect={(rel) => setSelectedRelease(rel)}
            />
          </Reveal>
        ))}
      </div>

      <ReleaseDetailModal
        release={selectedRelease}
        isOpen={!!selectedRelease}
        onClose={() => setSelectedRelease(null)}
      />
    </div>
  )
}

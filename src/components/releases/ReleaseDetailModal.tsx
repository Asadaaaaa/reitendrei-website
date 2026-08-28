'use client'
import { Modal } from '../ui/Modal'
import { SpotifyEmbed } from './SpotifyEmbed'
import type { Release } from '../../data/releases'
import { ExternalLink, Radio, Sparkles } from 'lucide-react'

interface ReleaseDetailModalProps {
  release: Release | null
  isOpen: boolean
  onClose: () => void
}

export function ReleaseDetailModal({ release, isOpen, onClose }: ReleaseDetailModalProps) {
  if (!release) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="4xl">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 p-5 sm:p-8 items-start">
        {/* Left: Artwork */}
        <div className="md:col-span-5 space-y-3">
          <div className="aspect-square rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-black/40">
            <img
              src={release.image}
              alt={release.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center justify-between font-mono text-[11px] text-white/40">
            <span className="text-accent font-bold">RELEASE // {release.number}</span>
            <span>{release.year}</span>
          </div>
        </div>

        {/* Right: Info + Spotify */}
        <div className="md:col-span-7 space-y-4">
          <div className="space-y-0.5">
            <span className="font-mono text-[11px] text-white/40 uppercase tracking-wider">
              {release.subtitle}
            </span>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight uppercase leading-none">
              {release.title}
            </h3>
          </div>

          {/* Description */}
          <div className="p-4 rounded-xl bg-white/3 border border-white/5 space-y-2">
            <div className="flex items-center gap-2 font-mono text-[10px] text-sky-400">
              <Sparkles size={13} />
              <span className="uppercase tracking-widest font-bold">STORYLINE &amp; SONICS</span>
            </div>
            <p className="text-sm text-white/80 leading-relaxed">
              {release.description}
            </p>
            <div className="pt-2 border-t border-white/5 text-xs text-white/40">
              <span className="text-accent font-semibold uppercase">SONIC CHARACTER: </span>
              {release.sonicCharacter}
            </div>
          </div>

          {/* Theme Tags */}
          <div className="flex flex-wrap gap-1.5">
            {release.themes.map((theme) => (
              <span
                key={theme}
                className="px-2.5 py-0.5 rounded-lg text-[11px] font-mono bg-white/5 border border-white/8 text-white/50"
              >
                #{theme}
              </span>
            ))}
          </div>

          {/* Spotify Embed */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between font-mono text-[11px] text-white/40">
              <span className="flex items-center gap-1.5 text-accent font-semibold">
                <Radio size={11} className="animate-pulse" /> DIRECT AUDIO STREAM
              </span>
              <a
                href={release.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-accent transition-colors"
              >
                <span>OPEN APP</span>
                <ExternalLink size={11} />
              </a>
            </div>
            <SpotifyEmbed
              trackId={release.spotifyTrackId}
              title={`${release.title} - Reiten Drei`}
            />
          </div>
        </div>
      </div>
    </Modal>
  )
}

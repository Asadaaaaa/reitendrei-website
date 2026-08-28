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
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="2xl">
      <div className="p-5 sm:p-7 space-y-5">
        {/* Top: Spotify Embed Audio Player */}
        <div className="space-y-2">
          <div className="flex items-center justify-between font-mono text-[11px] text-white/40 pb-1 border-b border-white/8">
            <span className="flex items-center gap-1.5 text-accent font-semibold">
              <Radio size={12} className="animate-pulse" /> DIRECT AUDIO STREAM // RD-{release.number}
            </span>
            <div className="flex items-center gap-3">
              <span>{release.year}</span>
              <a
                href={release.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-white/80 hover:text-accent transition-colors"
              >
                <span>SPOTIFY</span>
                <ExternalLink size={11} />
              </a>
            </div>
          </div>

          <SpotifyEmbed
            trackId={release.spotifyTrackId}
            title={`${release.title} - Reiten Drei`}
          />
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-1">
          <div className="font-mono text-[11px] text-accent uppercase tracking-wider font-semibold">
            {release.subtitle}
          </div>
          <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight uppercase leading-tight">
            {release.title}
          </h3>
        </div>

        {/* Storyline & Sonic Character */}
        <div className="p-4 sm:p-5 rounded-xl bg-white/3 border border-white/5 space-y-2.5">
          <div className="flex items-center gap-2 font-mono text-[10px] text-sky-400">
            <Sparkles size={13} />
            <span className="uppercase tracking-widest font-bold">STORYLINE &amp; SONICS</span>
          </div>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            {release.description}
          </p>
          <div className="pt-2 border-t border-white/5 text-xs text-white/40">
            <span className="text-accent font-semibold uppercase">SONIC CHARACTER: </span>
            {release.sonicCharacter}
          </div>
        </div>

        {/* YouTube Official Video Action Button if present */}
        {release.youtubeUrl && (
          <div className="pt-1">
            <a
              href={release.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-red-600/15 hover:bg-red-600/25 border border-red-500/30 hover:border-red-500/60 text-red-400 hover:text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-lg"
              data-cursor="link"
            >
              <svg className="w-4 h-4 fill-current text-red-500" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span>WATCH OFFICIAL VIDEO ON YOUTUBE</span>
              <ExternalLink size={12} className="opacity-70" />
            </a>
          </div>
        )}
      </div>
    </Modal>
  )
}

'use client'
import { useState } from 'react'
import { liveGalleryPhotos, type GalleryPhoto } from '../../data/gallery'
import { GalleryLightbox } from './GalleryLightbox'
import { Reveal } from '../motion/Reveal'
import { Camera, Eye } from 'lucide-react'

export function LiveGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null)

  return (
    <section
      id="gallery"
      className="relative py-20 sm:py-28 px-4 sm:px-8 md:px-12 bg-background border-b border-white/5 overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <Reveal direction="up">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/8">
            <div>
              <div className="flex items-center gap-2 font-mono text-[10px] text-accent uppercase tracking-widest mb-2">
                <Camera size={13} />
                <span>03 // VISUAL ARCHIVE</span>
              </div>
              <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tighter uppercase text-white leading-none">
                LIVE PERFORMANCE
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-white/40 max-w-xs leading-relaxed flex-shrink-0">
              Raw stages, rehearsal chronicles, and dynamic surf action. Click any visual to inspect.
            </p>
          </div>
        </Reveal>

        {/* Symmetrical 6-Photo Grid — 2-col on mobile, 3-col on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 items-stretch">
          {liveGalleryPhotos.map((photo, idx) => (
            <Reveal key={photo.id} direction="up" delay={idx * 0.06} className="h-full">
              <div
                className="group relative rounded-2xl overflow-hidden bg-surface border border-white/8 cursor-pointer shadow-xl hover:border-accent/40 hover:-translate-y-1 transition-all duration-500 h-full flex flex-col justify-between"
                onClick={() => setSelectedPhoto(photo)}
                data-cursor="view"
              >
                {/* Fixed Uniform 4:3 Aspect Ratio Container */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-background">
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-black/25 to-transparent opacity-75 group-hover:opacity-90 transition-opacity duration-300" />

                  {/* Category Tag Top Left */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 rounded-md bg-background/85 backdrop-blur-md text-white font-mono text-[10px] font-bold border border-white/10 uppercase tracking-wider shadow-md">
                      {photo.type}
                    </span>
                  </div>

                  {/* Inspect Hover Button Center */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
                    <div className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent text-white font-mono text-xs font-bold uppercase tracking-wider shadow-xl shadow-accent/50 scale-90 group-hover:scale-100 transition-transform duration-300">
                      <Eye size={14} />
                      <span>INSPECT</span>
                    </div>
                  </div>

                  {/* Bottom Info Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 z-10 space-y-0.5">
                    <div className="font-mono text-[10px] text-accent tracking-wider uppercase font-semibold">
                      {photo.venue}
                    </div>
                    <h3 className="font-display font-black text-base sm:text-lg text-white tracking-tight uppercase line-clamp-1 group-hover:text-accent transition-colors duration-200">
                      {photo.title}
                    </h3>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <GalleryLightbox
        photo={selectedPhoto}
        isOpen={!!selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </section>
  )
}

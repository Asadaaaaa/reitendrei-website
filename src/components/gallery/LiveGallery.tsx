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

        {/* Photo Grid — asymmetric 3-col */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 items-start">
          {liveGalleryPhotos.map((photo, idx) => (
            <Reveal key={photo.id} direction="up" delay={idx * 0.07}>
              <div
                className="group relative rounded-2xl overflow-hidden bg-surface border border-white/8 cursor-pointer shadow-lg hover:border-accent/40 hover:-translate-y-1 transition-all duration-500"
                onClick={() => setSelectedPhoto(photo)}
                data-cursor="view"
              >
                {/* Image */}
                <div
                  className={`relative w-full overflow-hidden bg-background ${
                    photo.aspect === 'portrait'
                      ? 'aspect-[3/4]'
                      : photo.aspect === 'square'
                      ? 'aspect-square'
                      : 'aspect-[4/3]'
                  }`}
                >
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

                  {/* Category Tag */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2 py-0.5 rounded-md bg-background/80 backdrop-blur-md text-white font-mono text-[9px] font-bold border border-white/10 uppercase tracking-wider">
                      {photo.type}
                    </span>
                  </div>

                  {/* Inspect Hover Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent text-white font-mono text-[10px] font-bold uppercase tracking-wider shadow-lg shadow-accent/40 scale-90 group-hover:scale-100 transition-transform">
                      <Eye size={12} />
                      <span>INSPECT</span>
                    </div>
                  </div>

                  {/* Bottom Info */}
                  <div className="absolute bottom-3 left-3 right-3 z-10">
                    <div className="font-mono text-[9px] text-accent tracking-wider uppercase mb-0.5">
                      {photo.venue}
                    </div>
                    <h3 className="font-display font-bold text-sm text-white tracking-tight uppercase line-clamp-1">
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

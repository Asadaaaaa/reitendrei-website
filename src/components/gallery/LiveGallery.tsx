'use client'
import { useState, useEffect } from 'react'
import { liveGalleryPhotos as defaultPhotos, type GalleryPhoto } from '../../data/gallery'
import { GalleryLightbox } from './GalleryLightbox'
import { Reveal } from '../motion/Reveal'
import { MagneticButton } from '../ui/MagneticButton'
import { Camera, Eye, ChevronDown, Sparkles, Film } from 'lucide-react'

export function LiveGallery() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>(defaultPhotos)
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [visibleCount, setVisibleCount] = useState(6)

  useEffect(() => {
    fetch('/api/gallery')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          const mapped: GalleryPhoto[] = data.data.map((row: any) => ({
            id: row.id,
            image: row.image,
            type: row.type,
            title: row.title,
            date: row.date,
            venue: row.venue,
            description: row.description,
            aspect: row.aspect || 'landscape',
          }))
          setPhotos(mapped)
        }
      })
      .catch((err) => console.error('Failed to load gallery:', err))
  }, [])

  const isComingSoon = photos.length === 0

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      setVisibleCount(mobile ? 3 : 6)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + (isMobile ? 3 : 6))
  }

  const visiblePhotos = photos.slice(0, visibleCount)
  const hasMore = visibleCount < photos.length

  return (
    <section
      id="gallery"
      className="relative py-20 sm:py-28 px-4 sm:px-8 md:px-12 bg-background border-b border-white/5 overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[200px] pointer-events-none" />

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
                GALLERY
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-white/50 max-w-xs leading-relaxed flex-shrink-0">
              {isComingSoon
                ? 'Visual documentation, live chronicles, and backstage memories.'
                : 'Raw stages, rehearsal chronicles, and dynamic surf action. Click any visual to inspect.'}
            </p>
          </div>
        </Reveal>

        {/* Coming Soon Box if no gallery items */}
        {isComingSoon ? (
          <Reveal direction="up" delay={0.1}>
            <div className="relative rounded-3xl border border-white/10 bg-surface/50 backdrop-blur-md p-10 sm:p-16 md:p-20 overflow-hidden text-center flex flex-col items-center justify-center space-y-6">
              {/* Radial gradient background accent */}
              <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent pointer-events-none" />
              
              <div className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/5 border border-white/10 shadow-inner">
                <Film className="w-8 h-8 sm:w-10 sm:h-10 text-accent animate-pulse" />
              </div>

              <div className="space-y-3 max-w-lg relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest">
                  <Sparkles size={12} />
                  <span>CURATING VISUAL ARCHIVE</span>
                </div>
                <h3 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight uppercase">
                  COMING SOON
                </h3>
                <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed">
                  Dokumentasi live performance, sesi studio, dan visual eksklusif Reiten Drei sedang dalam proses kurasi.
                </p>
              </div>

              {/* Status footer pill */}
              <div className="pt-2">
                <span className="font-mono text-[11px] text-white/40 uppercase tracking-wider">
                  STAY TUNED ON INSTAGRAM &amp; YOUTUBE
                </span>
              </div>
            </div>
          </Reveal>
        ) : (
          /* Symmetrical Photo Grid when photos available */
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 items-stretch">
              {visiblePhotos.map((photo, idx) => (
                <Reveal key={`${photo.id}-${idx}`} direction="up" delay={(idx % 6) * 0.05} className="h-full">
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
                        <div className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent text-slate-950 font-mono text-xs font-black uppercase tracking-wider shadow-xl shadow-accent/50 scale-90 group-hover:scale-100 transition-transform duration-300">
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

            {/* Load More Button */}
            {hasMore && (
              <Reveal direction="up">
                <div className="flex justify-center pt-4">
                  <MagneticButton strength={15}>
                    <button
                      type="button"
                      onClick={handleLoadMore}
                      className="group flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-surface hover:bg-card border border-white/10 hover:border-accent text-white font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-xl hover:shadow-accent/20"
                      data-cursor="pointer"
                    >
                      <span>LOAD MORE ARCHIVES</span>
                      <ChevronDown size={15} className="text-accent group-hover:translate-y-0.5 transition-transform" />
                    </button>
                  </MagneticButton>
                </div>
              </Reveal>
            )}
          </>
        )}
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

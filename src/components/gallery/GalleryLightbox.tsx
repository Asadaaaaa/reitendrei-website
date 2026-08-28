import { Modal } from '../ui/Modal'
import type { GalleryPhoto } from '../../data/gallery'
import { Calendar, MapPin, Sparkles } from 'lucide-react'

interface GalleryLightboxProps {
  photo: GalleryPhoto | null
  isOpen: boolean
  onClose: () => void
}

export function GalleryLightbox({ photo, isOpen, onClose }: GalleryLightboxProps) {
  if (!photo) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="4xl">
      {/* High-res Image Preview */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-background">
        <img
          src={photo.image}
          alt={photo.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-6 left-6">
          <span className="px-3 py-1.5 rounded-full bg-accent text-white font-mono text-xs font-bold tracking-widest uppercase shadow-lg shadow-accent/30">
            {photo.type}
          </span>
        </div>
      </div>

      {/* Meta Content & Details */}
      <div className="p-6 sm:p-10 space-y-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted">
            <span className="flex items-center gap-1.5"><Calendar size={14} className="text-accent" /> {photo.date}</span>
            <span className="flex items-center gap-1.5"><MapPin size={14} className="text-accent" /> {photo.venue}</span>
          </div>
          <h3 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight uppercase">
            {photo.title}
          </h3>
        </div>

        <div className="p-6 rounded-2xl bg-card border border-white/5 space-y-3">
          <div className="flex items-center gap-2 font-mono text-xs text-sky-400">
            <Sparkles size={14} />
            <span className="uppercase tracking-widest font-bold">PERFORMANCE ARCHIVE NOTE</span>
          </div>
          <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">
            {photo.description}
          </p>
        </div>
      </div>
    </Modal>
  )
}

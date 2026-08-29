export interface GalleryPhoto {
  id: string
  image: string
  type: string
  title: string
  date: string
  venue: string
  description: string
  aspect: 'landscape' | 'portrait' | 'square'
  accentColor?: string
}

// Live gallery photos - empty for Coming Soon state
export const liveGalleryPhotos: GalleryPhoto[] = []

export interface GalleryItem {
  id: string
  title: string
  subtitle: string
  tag: string
  year: string
  description: string
  tone: string
}

export const galleryItems: GalleryItem[] = []

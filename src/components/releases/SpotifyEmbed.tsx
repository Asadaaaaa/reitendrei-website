'use client'
interface SpotifyEmbedProps {
  trackId: string
  title?: string
  className?: string
}

export function SpotifyEmbed({ trackId, title = 'Spotify Player', className = '' }: SpotifyEmbedProps) {
  const spotifyEmbedUrl = `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`

  return (
    <div className={`w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#121212] ${className}`}>
      <iframe
        src={spotifyEmbedUrl}
        title={title}
        width="100%"
        height="152"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="w-full block"
      />
    </div>
  )
}

export interface Announcement {
  label: string
  title: string
  subtitle?: string
  href?: string
  date?: string
}

export const currentAnnouncement: Announcement = {
  label: 'NOW',
  title: 'BADJINGAN',
  subtitle: 'OUT NOW ON SPOTIFY',
  href: '#releases',
  date: 'LATEST SINGLE',
}

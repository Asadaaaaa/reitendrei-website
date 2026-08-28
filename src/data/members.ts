export interface Member {
  id: string
  name: string
  role: string
  instrument: string
  number: string
  image: string
  quote: string
  focus: string
  bio?: string
  socials?: { name: string; url: string }[]
}

export const members: Member[] = [
  {
    id: 'zarel',
    name: 'Zarel Kaka Putrama',
    role: 'Drums & Percussion',
    instrument: 'Drums',
    number: '01',
    image: '/images/members/zarel.webp',
    quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    focus: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
  },
  {
    id: 'maliq',
    name: 'Maliq Rizki Mulia',
    role: 'Bass Guitar',
    instrument: 'Bass',
    number: '02',
    image: '/images/members/maliq.webp',
    quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    focus: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
  },
  {
    id: 'anggarda',
    name: 'Anggarda Raizza Putra Andreansyah',
    role: 'Lead & Rhythm Guitar',
    instrument: 'Guitar',
    number: '03',
    image: '/images/members/anggarda.webp',
    quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    focus: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
  },
  {
    id: 'ijlal',
    name: 'Ijlal Zein Ahza',
    role: 'Lead Vocals & Expression',
    instrument: 'Vocals',
    number: '04',
    image: '/images/members/ijlal.webp',
    quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    focus: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
  },
]

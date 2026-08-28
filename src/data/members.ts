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
    name: 'Zarel Kaka',
    role: 'Drums & Percussion',
    instrument: 'Drums',
    number: '01',
    image: '/images/members/zarel-kaka.webp',
    quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    focus: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
  },
  {
    id: 'malique',
    name: 'Malique Rizki Mulia',
    role: 'Bass Guitar',
    instrument: 'Bass',
    number: '02',
    image: '/images/members/malique-rizki-mulia.webp',
    quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    focus: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
  },
  {
    id: 'arda',
    name: 'Arda Raizza',
    role: 'Guitar',
    instrument: 'Guitar',
    number: '03',
    image: '/images/members/arda-raizza.webp',
    quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    focus: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
  },
  {
    id: 'javed',
    name: 'Javed Revanda',
    role: 'Guitar',
    instrument: 'Guitar',
    number: '04',
    image: '/images/members/javed-revanda.webp',
    quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    focus: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
  },
  {
    id: 'zein',
    name: 'Zein Ahza',
    role: 'Lead Vocals',
    instrument: 'Vocals',
    number: '05',
    image: '/images/members/zein-ahza.webp',
    quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    focus: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
  },
]

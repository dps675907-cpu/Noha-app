
import { Movie } from './types';

export const MOVIES: Movie[] = [
  {
    id: '1',
    title: 'Neon Shadows',
    description: 'In a futuristic city draped in orange neon, a detective uncovers a conspiracy that could alter reality itself.',
    thumbnail: 'https://picsum.photos/seed/neon/800/450',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    rating: 8.9,
    year: 2024,
    genre: ['Sci-Fi', 'Thriller'],
    type: 'movie',
    duration: '2h 15m'
  },
  {
    id: '2',
    title: 'Orange Horizon',
    description: 'A breathtaking journey across the vast Martian landscapes as humanity attempts its first colony.',
    thumbnail: 'https://picsum.photos/seed/mars/800/450',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    rating: 9.2,
    year: 2023,
    genre: ['Adventure', 'Drama'],
    type: 'series',
    seasons: 3
  },
  {
    id: '3',
    title: 'Midnight Pulse',
    description: 'The underground racing scene gets a jolt when a mysterious driver appears with a car that defies physics.',
    thumbnail: 'https://picsum.photos/seed/race/800/450',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    rating: 7.5,
    year: 2024,
    genre: ['Action', 'Crime'],
    type: 'movie',
    duration: '1h 48m'
  },
  {
    id: '4',
    title: 'The Silent Code',
    description: 'A master hacker discovers an encrypted message that leads to a hidden digital world.',
    thumbnail: 'https://picsum.photos/seed/code/800/450',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    rating: 8.4,
    year: 2023,
    genre: ['Cyberpunk', 'Mystery'],
    type: 'series',
    seasons: 1
  },
  {
    id: '5',
    title: 'Solar Winds',
    description: 'Deep space explorers encounter a celestial phenomenon that challenges their understanding of time.',
    thumbnail: 'https://picsum.photos/seed/space/800/450',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    rating: 8.1,
    year: 2024,
    genre: ['Sci-Fi', 'Epic'],
    type: 'movie',
    duration: '3h 05m'
  },
  {
    id: '6',
    title: 'Apex Predator',
    description: 'In the wilderness, survival is the only law. A group of hikers must outwit a force they cannot see.',
    thumbnail: 'https://picsum.photos/seed/nature/800/450',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    rating: 7.9,
    year: 2024,
    genre: ['Horror', 'Survival'],
    type: 'movie',
    duration: '1h 32m'
  }
];

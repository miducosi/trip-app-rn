import { AppDestination } from '../api/types/Country';

export const fallbackDestinations: AppDestination[] = [
  {
    id: 'BRA',
    name: 'Rio de Janeiro',
    country: 'Brazil',
    image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400&h=300&fit=crop',
    rating: 5.0,
    reviews: 143,
    region: 'Americas',
    population: 212559417,
    flag: 'https://flagcdn.com/w320/br.png',
  },
  {
    id: 'ESP',
    name: 'Barcelona',
    country: 'Spain',
    image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400&h=300&fit=crop',
    rating: 4.8,
    reviews: 89,
    region: 'Europe',
    population: 46754778,
    flag: 'https://flagcdn.com/w320/es.png',
  },
  {
    id: 'JPN',
    name: 'Tokyo',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop',
    rating: 4.9,
    reviews: 156,
    region: 'Asia',
    population: 125836021,
    flag: 'https://flagcdn.com/w320/jp.png',
  },
];

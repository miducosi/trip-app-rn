import { countriesClient } from '../clients/countriesClient';
import { Country, AppDestination } from '../types/Country';

// Get all countries
export const getAllCountries = async (): Promise<Country[]> => {
  const response = await countriesClient.get('/all');
  return response.data;
};

// Get countries by region
export const getCountriesByRegion = async (region: string): Promise<Country[]> => {
  const response = await countriesClient.get(`/region/${region}`);
  return response.data;
};

// Get popular destinations (major countries/cities)
export const getPopularDestinations = async (): Promise<AppDestination[]> => {
  const popularCountries = [
    'brazil', 'spain', 'japan', 'france', 'united states', 'united kingdom',
    'italy', 'germany', 'australia', 'canada', 'netherlands', 'switzerland'
  ];

  try {
    const countries = await getAllCountries();
    const popularCountriesData = countries.filter(country => 
      popularCountries.some(popular => 
        country.name.common.toLowerCase().includes(popular.toLowerCase())
      )
    );

    return popularCountriesData.map(country => ({
      id: country.cca3,
      name: country.capital?.[0] || country.name.common,
      country: country.name.common,
      image: getCountryImage(country.name.common),
      rating: getRandomRating(),
      reviews: getRandomReviews(),
      region: country.region,
      population: country.population,
      flag: country.flags.png,
    }));
  } catch (error) {
    console.error('Error fetching popular destinations:', error);
    return getFallbackDestinations();
  }
};

// Get destinations by region
export const getDestinationsByRegion = async (region: string): Promise<AppDestination[]> => {
  try {
    const countries = await getCountriesByRegion(region);
    return countries.map(country => ({
      id: country.cca3,
      name: country.capital?.[0] || country.name.common,
      country: country.name.common,
      image: getCountryImage(country.name.common),
      rating: getRandomRating(),
      reviews: getRandomReviews(),
      region: country.region,
      population: country.population,
      flag: country.flags.png,
    }));
  } catch (error) {
    console.error(`Error fetching destinations for region ${region}:`, error);
    return [];
  }
};

// Helper function to get country image from Unsplash
const getCountryImage = (countryName: string): string => {
  const countryImages: { [key: string]: string } = {
    'Brazil': 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400&h=300&fit=crop',
    'Spain': 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400&h=300&fit=crop',
    'Japan': 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop',
    'France': 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=300&fit=crop',
    'United States': 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop',
    'United Kingdom': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop',
    'Italy': 'https://images.unsplash.com/photo-1555992336-03a23c7b20ee?w=400&h=300&fit=crop',
    'Germany': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    'Australia': 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&h=300&fit=crop',
    'Canada': 'https://images.unsplash.com/photo-1519832979-6fa011b87667?w=400&h=300&fit=crop',
  };

  return countryImages[countryName] || `https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400&h=300&fit=crop`;
};

// Helper function to generate random rating
const getRandomRating = (): number => {
  return Math.round((Math.random() * 1.5 + 3.5) * 10) / 10; // 3.5 to 5.0
};

// Helper function to generate random reviews count
const getRandomReviews = (): number => {
  return Math.floor(Math.random() * 500) + 50; // 50 to 550
};

// Fallback destinations if API fails
const getFallbackDestinations = (): AppDestination[] => [
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
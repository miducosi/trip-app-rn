import { useQuery } from '@tanstack/react-query';
import { 
  getAllCountries, 
  getCountriesByRegion, 
  getPopularDestinations,
  getDestinationsByRegion 
} from '../services/countriesService';
import { Country, AppDestination } from '../types/Country';

// Hook for getting all countries
export const useAllCountries = () => {
  return useQuery({
    queryKey: ['allCountries'],
    queryFn: getAllCountries,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 2 * 60 * 60 * 1000, // 2 hours
  });
};

// Hook for getting countries by region
export const useCountriesByRegion = (region: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['countriesByRegion', region],
    queryFn: () => getCountriesByRegion(region),
    enabled: enabled && region.length > 0,
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};

// Hook for getting popular destinations
export const usePopularDestinations = () => {
  return useQuery({
    queryKey: ['popularDestinations'],
    queryFn: getPopularDestinations,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 2 * 60 * 60 * 1000, // 2 hours
  });
};

// Hook for getting destinations by region
export const useDestinationsByRegion = (region: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['destinationsByRegion', region],
    queryFn: () => getDestinationsByRegion(region),
    enabled: enabled && region.length > 0,
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
}; 
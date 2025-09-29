import { useQuery } from '@tanstack/react-query';
import { 
  searchPlaces, 
  getPlacesByCoordinates, 
  getPlaceDetails, 
  getPopularDestinations,
  getCityAttractions 
} from '../services/openTripMapService';
import { Destination, PlaceDetails } from '../types/Destination';

// Hook for searching places
export const useSearchPlaces = (query: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['searchPlaces', query],
    queryFn: () => searchPlaces(query),
    enabled: enabled && query.length > 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook for getting places by coordinates
export const usePlacesByCoordinates = (
  lat: number, 
  lon: number, 
  radius: number = 5000,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: ['placesByCoordinates', lat, lon, radius],
    queryFn: () => getPlacesByCoordinates(lat, lon, radius),
    enabled: enabled && lat !== 0 && lon !== 0,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook for getting place details
export const usePlaceDetails = (xid: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['placeDetails', xid],
    queryFn: () => getPlaceDetails(xid),
    enabled: enabled && xid.length > 0,
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};

// Hook for getting popular destinations
export const usePopularDestinations = () => {
  return useQuery({
    queryKey: ['popularDestinations'],
    queryFn: getPopularDestinations,
    staleTime: 60 * 60 * 1000, // 1 hour
    cacheTime: 2 * 60 * 60 * 1000, // 2 hours
  });
};

// Hook for getting city attractions
export const useCityAttractions = (
  cityName: string, 
  lat: number, 
  lon: number,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: ['cityAttractions', cityName, lat, lon],
    queryFn: () => getCityAttractions(cityName, lat, lon),
    enabled: enabled && cityName.length > 0 && lat !== 0 && lon !== 0,
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
}; 
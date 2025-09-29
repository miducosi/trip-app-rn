import { openTripMapClient } from '../clients/openTripMapClient';
import { Destination, PlaceDetails } from '../types/Destination';

// Search for places by text query
export const searchPlaces = async (query: string, limit: number = 10) => {
  const response = await openTripMapClient.get('/autosuggest', {
    params: {
      name: query,
      limit,
      format: 'json',
    },
  });
  return response.data;
};

// Get places by coordinates (radius search)
export const getPlacesByCoordinates = async (
  lat: number,
  lon: number,
  radius: number = 5000,
  kinds: string = 'cultural,historic,interesting_places,tourist_facilities'
) => {
  const response = await openTripMapClient.get('/radius', {
    params: {
      radius,
      lon,
      lat,
      kinds,
      format: 'json',
      limit: 20,
    },
  });
  return response.data.features as Destination[];
};

// Get place details by XID
export const getPlaceDetails = async (xid: string) => {
  const response = await openTripMapClient.get(`/xid/${xid}`, {
    params: {
      format: 'json',
    },
  });
  return response.data as PlaceDetails;
};

// Get popular destinations
export const getPopularDestinations = async () => {
  const popularCities = [
    { name: 'Rio de Janeiro', lat: -22.9068, lon: -43.1729 },
    { name: 'Barcelona', lat: 41.3851, lon: 2.1734 },
    { name: 'Tokyo', lat: 35.6762, lon: 139.6503 },
    { name: 'Paris', lat: 48.8566, lon: 2.3522 },
    { name: 'New York', lat: 40.7128, lon: -74.0060 },
    { name: 'London', lat: 51.5074, lon: -0.1278 },
  ];

  const destinations = await Promise.all(
    popularCities.map(async (city) => {
      try {
        const places = await getPlacesByCoordinates(city.lat, city.lon, 10000);
        return {
          city: city.name,
          places: places.slice(0, 5), // Get top 5 places
        };
      } catch (error) {
        console.error(`Error fetching places for ${city.name}:`, error);
        return { city: city.name, places: [] };
      }
    })
  );

  return destinations;
};

// Get attractions for a specific city
export const getCityAttractions = async (cityName: string, lat: number, lon: number) => {
  try {
    const attractions = await getPlacesByCoordinates(lat, lon, 15000, 'cultural,historic,interesting_places');
    return attractions.map(attraction => ({
      ...attraction,
      city: cityName,
    }));
  } catch (error) {
    console.error(`Error fetching attractions for ${cityName}:`, error);
    return [];
  }
}; 
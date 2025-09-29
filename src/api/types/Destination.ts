export interface Destination {
  xid: string;
  name: string;
  rate: number;
  osm: string;
  wikidata: string;
  kinds: string;
  point: {
    lon: number;
    lat: number;
  };
  bbox?: {
    lon_min: number;
    lon_max: number;
    lat_min: number;
    lat_max: number;
  };
  dist?: number;
  preview?: {
    source: string;
    height: number;
    width: number;
  };
  wikipedia_extracts?: {
    title: string;
    text: string;
    html: string;
  };
  image?: string;
  country?: string;
  city?: string;
  state?: string;
}

export interface DestinationsResponse {
  type: string;
  features: Destination[];
}

export interface PlaceDetails {
  xid: string;
  name: string;
  rate: number;
  osm: string;
  wikidata: string;
  kinds: string;
  point: {
    lon: number;
    lat: number;
  };
  bbox?: {
    lon_min: number;
    lon_max: number;
    lat_min: number;
    lat_max: number;
  };
  wikipedia_extracts?: {
    title: string;
    text: string;
    html: string;
  };
  image?: string;
  country?: string;
  city?: string;
  state?: string;
  url?: string;
  otm?: string;
  sources?: {
    geometry: string;
    attributes: string[];
  };
  address?: {
    city: string;
    state: string;
    country: string;
    postcode: string;
    suburb: string;
    road: string;
    house_number: string;
  };
} 
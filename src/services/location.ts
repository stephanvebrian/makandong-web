import locationsJson from '@/data/locations.json';
import citiesJson from '@/data/cities.json';
import {
  GeolocationType,
  getDistanceInKm,
  haversineDistance,
} from '@/utils/geolocation';

interface BaseLocation {
  Title: string;
  Description: string;
  Longitude: string;
  Latitude: string;
  LocationDescription: string;
  Tags: string[];
}

type Location = BaseLocation & {
  Distance: number;
};

const locations = locationsJson.map(
  (location): BaseLocation => ({
    Title: location.title,
    Description: location.description,
    Longitude: location.longitude,
    Latitude: location.latitude,
    LocationDescription: location.locationDescription,
    Tags: location.tags,
  }),
);

const getLocations = (): BaseLocation[] => {
  return locations;
};

const getNearestLocations = (location: GeolocationType): Location[] => {
  const locDistances: Location[] = [];

  locations.forEach((currLoc) => {
    const distance = getDistanceInKm(
      {
        Latitude: +currLoc.Latitude,
        Longitude: +currLoc.Longitude,
      },
      {
        Latitude: location.Latitude,
        Longitude: location.Longitude,
      },
    );

    locDistances.push({
      ...currLoc,
      Distance: distance,
    });
  });

  locDistances.sort((a, b) => a.Distance - b.Distance);

  return locDistances;
};

const getNearestCityName = (loc: GeolocationType): string => {
  let minDistance = Infinity;
  let minCityLocation = '';

  citiesJson.forEach((city) => {
    const cityGeoloc: GeolocationType = {
      Latitude: +city.lat,
      Longitude: +city.lng,
    };

    const distance = haversineDistance(loc, cityGeoloc);

    if (distance < minDistance) {
      minCityLocation = city.city;
      minDistance = distance;
    }
  });

  return minCityLocation;
};

export { getLocations, getNearestLocations, getNearestCityName };
export type { BaseLocation, Location };

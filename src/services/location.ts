import locationsJson from '@/data/locations.json';
import { GeolocationType, getDistanceInKm } from '@/utils/geolocation';

interface Location {
  Title: string;
  Description: string;
  Longitude: string;
  Latitude: string;
  LocationDescription: string;
}

type LocationDistance = Location & {
  Distance: number;
};

const locations = locationsJson.map(
  (location): Location => ({
    Title: location.title,
    Description: location.description,
    Longitude: location.longitude,
    Latitude: location.latitude,
    LocationDescription: location.locationDescription,
  }),
);

const getLocations = (): Location[] => {
  return locations;
};

const getNearestLocations = (location: GeolocationType): LocationDistance[] => {
  const locDistances: LocationDistance[] = [];

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

export { getLocations, getNearestLocations };

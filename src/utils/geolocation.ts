interface GeolocationType {
  Longitude: number;
  Latitude: number;
}

const radiusEarthInKm = 6371;
const radiusEarthInMeter = 6378137;

const squared = (x: number) => x * x;
const degToRad = (deg: number) => deg * (Math.PI / 180);
const hav = (x: number) => squared(Math.sin(x / 2));

// refrence: https://yogeshnogia.medium.com/program-to-sort-the-given-array-of-objects-having-lat-lng-by-distance-from-your-given-location-9052eb45f86d
const getDistanceInKm = (
  loc1: GeolocationType,
  loc2: GeolocationType,
): number => {
  const dLat = degToRad(loc2.Latitude - loc1.Latitude);
  const dLon = degToRad(loc2.Longitude - loc1.Longitude);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degToRad(loc1.Latitude)) *
      Math.cos(degToRad(loc2.Latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = radiusEarthInKm * c; // Distance in km
  return d; // distance returned
};

const haversineDistance = (a: GeolocationType, b: GeolocationType) => {
  const aLat = degToRad(a.Latitude);
  const bLat = degToRad(b.Latitude);
  const aLong = degToRad(a.Longitude);
  const bLong = degToRad(b.Longitude);

  const ht =
    hav(bLat - aLat) + Math.cos(aLat) * Math.cos(bLat) * hav(bLong - aLong);

  const distance = 2 * radiusEarthInMeter * Math.asin(Math.sqrt(ht));

  return distance;
};

export { getDistanceInKm, haversineDistance };
export type { GeolocationType };

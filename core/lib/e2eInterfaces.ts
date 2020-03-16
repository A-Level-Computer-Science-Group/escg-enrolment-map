export interface SchoolInfo {
  name: string;
  coordinates: Coordinates;
  numMatchingStudents: number;
}

export interface OutcodeInfo {
  outcode: string;
  coordinates: Coordinates | null;
  numMatchingStudents: number;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export function LatLngToCoords(
  latitude: number,
  longitude: number
): Coordinates {
  return {
    latitude,
    longitude
  };
}

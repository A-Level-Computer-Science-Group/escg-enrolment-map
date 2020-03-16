import { e2e } from 'escg-enrolment-map-core';
const LatLngToCoords = e2e.LatLngToCoords;

export interface School {
  name: string;
  coords: e2e.Coordinates;
}

const schools: School[] = [
  {
    name: 'Parklands',
    coords: LatLngToCoords(50.798574, 0.26842),
  },
  {
    name: 'Cavendish',
    coords: LatLngToCoords(50.785854, 0.255762),
  },
];

/**
 * Returns an array of all schools.
 */
export function _schools(): School[] {
  return schools;
}

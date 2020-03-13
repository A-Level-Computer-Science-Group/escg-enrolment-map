type LatLng = [number, number];

export interface School {
  name: string;
  coords: LatLng;
}

const schools: School[] = [
  {
    name: 'Parklands',
    coords: [50.798574, 0.26842],
  },
  {
    name: 'Cavendish',
    coords: [50.785854, 0.255762],
  },
];

/**
 * Returns an array of all schools.
 */
export function _schools(): School[] {
  return schools;
}

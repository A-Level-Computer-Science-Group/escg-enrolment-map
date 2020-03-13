type LatLng = [number, number];

export interface College {
  name: string;
  coords: LatLng;
  colour: 'orange' | 'green' | 'blue';
}

const colleges: College[] = [
  {
    name: 'ESCG Eastbourne',
    coords: [50.78829, 0.271392],
    colour: 'orange',
  },
  {
    name: 'ESCG Lewes',
    coords: [50.870314, 0.015465],
    colour: 'blue',
  },
  {
    name: 'ESCG Hastings',
    coords: [50.85811, 0.577994],
    colour: 'green',
  },
];

/**
 * Returns an array of all colleges.
 */
export function _colleges(): College[] {
  return colleges;
}

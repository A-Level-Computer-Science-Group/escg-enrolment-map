import { SchoolName } from "./enums";
import { School } from "./interfaces";
import { LatLng } from "leaflet";

// example schools
export const schools: School[] = [
  {
    name: SchoolName.parklands,
    coords: new LatLng(50.798574, 0.26842)
  },
  {
    name: SchoolName.ocklynge,
    coords: new LatLng(50.785854, 0.255762)
  }
];

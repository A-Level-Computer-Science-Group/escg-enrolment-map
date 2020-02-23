import { College, CourseType, Filters, Gender, SchoolName } from "./enums";
import { LatLng, Marker, Circle } from "leaflet";

export interface School {
  name: SchoolName;
  coords: LatLng;
}

export interface Student {
  gender: Gender;
  course: CourseType;
  school: SchoolName;
  college: College;
  postcode?: string;
  year?: number;
}

export interface Filter {
  type: Filters;
  filter: CourseType | Gender | "";
}

export interface SchoolMarker {
  name: SchoolName;
  marker: Marker | Circle;
}

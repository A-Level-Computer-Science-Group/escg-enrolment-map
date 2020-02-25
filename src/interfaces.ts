import { College, CourseType, Filters, Gender, SchoolName } from "./enums";
import { LatLng, Marker, Circle } from "leaflet";
import { applyFilters } from "./FILTERS";
import { studentInfo } from "./student";

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
  name: SchoolName | College;
  marker: Marker | Circle;
}

export function CollegePopupText(name: College, filters: Filter[]): string {
  let output = SchoolPopupText(name, filters);
  if (
    filters.find(f => {
      return f.filter !== "";
    })
  ) {
    output +=
      "<br>" +
      getDescriptors(filters) +
      "Students: " +
      applyFilters(collegeStudents(name));
  }
  return output;
}

export function SchoolPopupText(
  name: College | SchoolName,
  filters: Filter[]
): string {
  return "<b>" + name + "</b><br>" + getDescriptors(filters) + "Students: ";
}

export function getDescriptors(filtersArr: Filter[]) {
  let descriptors = "";
  // capitalize the first letter of each filter and add it to the string
  filtersArr.forEach(f => {
    if (f.filter !== "") {
      descriptors += Capitalize(f.filter) + " ";
    }
  });
  if (descriptors === "") {
    return "Total ";
  } else {
    return descriptors;
  }
}

export function Capitalize(s: string) {
  return s.slice(0, 1).toUpperCase() + s.slice(1);
}

export function collegeStudents(c: College): Student[] {
  return studentInfo.filter(s => {
    return s.college === c;
  });
}

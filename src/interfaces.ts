import { College, CourseType, Filters, Gender, SchoolName } from "./enums";
import { Marker, Circle } from "leaflet";
import { applyFilters } from "./FILTERS";
import { studentInfo } from "./RandomData";

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
  filter: CourseType | Gender | College | "";
}

export interface CollegeMarker {
  name: College;
  marker: Marker;
}

export interface SchoolMarker {
  name: SchoolName;
  total: Circle;
  filtered: Circle;
}

export function PopupText(
  name: College | SchoolName,
  filters: Filter[],
  totalLine?: boolean
): string {
  let output = "";
  if (name) {
    output += "<b>" + name + "</b>";
  }
  if (totalLine) {
    output += "<br>" + "Total Students: " + LocalStudents(name).length;
  }
  if (filters) {
    output +=
      "<br>" +
      getDescriptors(filters) +
      "Students: " +
      applyFilters(LocalStudents(name), filters).length;
  }
  return output;
}

function getDescriptors(filtersArr: Filter[]) {
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

export function LocalStudents(name: College | SchoolName): Student[] {
  if ((Object as any).values(SchoolName).includes(name)) {
    return studentInfo.filter(s => {
      return s.school === name;
    });
  } else if ((Object as any).values(College).includes(name)) {
    return studentInfo.filter(s => {
      return s.college === name;
    });
  } else {
    return new Array<Student>();
  }
}

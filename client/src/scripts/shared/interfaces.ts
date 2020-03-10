import { CollegeName, CourseType, Filters, Gender, SchoolName } from "./enums";
import { Marker, Circle, LatLngExpression } from "leaflet";
import { applyFiltersOld } from "../process/mod";
import { Students } from "../process/students";
import { Colour } from "./icons";

export interface Student {
  gender: Gender;
  course: CourseType;
  school: SchoolName;
  college: CollegeName;
  postcode?: string;
  year?: number;
}

export interface School {
  name: SchoolName;
  coords: LatLngExpression;
}

export interface College {
  name: CollegeName;
  coords: LatLngExpression;
  colour: Colour;
}

export interface Filter {
  type: Filters;
  filter: CourseType | Gender | CollegeName | SchoolName | "";
}

export interface CollegeMarker {
  name: CollegeName;
  marker: Marker;
}

export interface SchoolMarker {
  name: SchoolName;
  total: Circle;
  filtered: Circle;
}

export const Capitalize = (s: string) => {
  return s.slice(0, 1).toUpperCase() + s.slice(1);
};

const getDescriptorsOld = (filtersArr: Filter[]) => {
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
};

/**
 * Returns a student array that is filtered based on the name input.
 * @param name Name of a school or college.
 * @param students Optional. A student array to filter. Filters all students if not defined.
 */
export const LocalStudentsOld = (
  name: CollegeName | SchoolName | Filters.college,
  students?: Student[] | string
): Student[] => {
  const studentArr = students && students !== "" ? students : Students;
  if (Object.values(SchoolName).includes(name as SchoolName)) {
    return (studentArr as Student[]).filter(s => {
      return s.school === name;
    });
  } else if (Object.values(CollegeName).includes(name as CollegeName)) {
    return (studentArr as Student[]).filter(s => {
      return s.college === name;
    });
  } else {
    return studentArr as Student[];
  }
};

export const PopupTextOld = (
  name: CollegeName | SchoolName,
  filters: Filter[],
  totalLine?: boolean
): string => {
  let output = "";
  if (name) {
    output += "<b>" + name + "</b>";
  }
  if (totalLine && getDescriptorsOld(filters) !== "Total ") {
    output += "<br>" + "Total Students: " + LocalStudentsOld(name).length;
  }
  if (filters) {
    output +=
      "<br>" +
      getDescriptorsOld(filters) +
      "Students: " +
      applyFiltersOld(LocalStudentsOld(name), filters).length;
  }
  return output;
};

import { CourseType, Gender, CollegeName, SchoolName, Filters } from "../enums";
import { Filter, Student, College, School } from "../interfaces";
import { Colleges } from "./colleges";
import { Students } from "./students";
import { Schools } from "./schools";
import { LatLngExpression } from "leaflet";

export const FILTER = {
  /**
   * Returns an array of school names, relevant map coordinates, 
   * and a filtered count of students attending the school.
   * @param filterArr An array of filters to apply.
   */
  getSchools: (
    filterArr: Filter[]
  ): { name: SchoolName; coords: LatLngExpression; population: number }[] => {
    const output = new Array<{
      name: SchoolName;
      coords: LatLngExpression;
      population: number;
    }>();
    Schools.forEach(s => {
      filterArr.push({ type: Filters.school, filter: s.name });
      output.push({
        name: s.name,
        coords: s.coords,
        population: proFilter(filterArr).length
      });
      filterArr.pop();
    });
    return output;
  }
};

export const courseFilter: Filter = {
  type: Filters.course,
  filter: ""
};
export const genderFilter: Filter = {
  type: Filters.gender,
  filter: ""
};
export const collegeFilter: Filter = {
  type: Filters.college,
  filter: ""
};
export const filtersArr = [genderFilter, courseFilter, collegeFilter];

/**
 * Returns a student array that is filtered based on the name input.
 * @param name Name of a school or college.
 * @param students Optional. A student array to filter. Filters all students if not defined.
 */
export const LocalStudents = (
  name: CollegeName | SchoolName,
  students?: Student[] | string
): Student[] => {
  const studentArr = students && students !== "" ? students : Students;
  if ((Object as any).values(SchoolName).includes(name)) {
    return (studentArr as Student[]).filter(s => {
      return s.school === name;
    });
  } else if ((Object as any).values(CollegeName).includes(name)) {
    return (studentArr as Student[]).filter(s => {
      return s.college === name;
    });
  } else {
    return studentArr as Student[];
  }
};

/**
 * Returns an array of students filtered by every supplied filter.
 * @param studentsArr A supplied or automatically gathered array of students.
 * @param filters An array of filters.
 */
export const applyFilters = (studentsArr: Student[], filters?: Filter[]) => {
  if (!filters) {
    filters = filtersArr;
  }
  if (
    // if any filters are defined
    filters.findIndex(f => {
      return f.filter !== "";
    }) !== -1
  ) {
    // apply each filter to the incoming array and then re-assign the array
    filters.forEach(f => {
      if (f.filter !== "") {
        studentsArr = studentsArr.filter(s => {
          return s[f.type] === f.filter;
        });
      }
    });
  }
  return studentsArr;
};

/**
 * Returns an array of students that match all filters.
 * @param filterArr An array of all filters.
 */
const proFilter = (filterArr: Filter[]): Student[] => {
  // remove blank filters
  const fArr = filterArr.filter(f => {
    return f.filter !== "";
  });
  // if a filter does not match, remove the student
  const outS = Students.filter(s => {
    fArr.forEach(f => {
      if (s[f.type] !== f.filter.toString()) {
        return false;
      }
    });
  });
  return outS;
};

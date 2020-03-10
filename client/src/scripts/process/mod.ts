import { CourseType, Gender, CollegeName, SchoolName, Filters } from "../enums";
import { Filter, Student, College, School } from "../interfaces";
import { Colleges } from "./colleges";
import { Students } from "./students";
import { Schools } from "./schools";
import { LatLngExpression } from "leaflet";
import { Colour } from "../icons";

interface SchoolObject {
  name: SchoolName;
  coords: LatLngExpression;
  population: number;
  filteredPop: number;
}

interface CollegeObject {
  name: CollegeName;
  coords: LatLngExpression;
  colour: Colour;
  population: number;
  filteredPop: number;
}

export const FILTER = {
  /**
   * Returns an array of school names, relevant map coordinates, and two
   * counts of students attending the school - one a total and the other filtered.
   * @param filterArr An array of filters to apply.
   */
  getSchools: (filterArr: Filter[]): SchoolObject[] => {
    const output = new Array<SchoolObject>();
    Schools.forEach(s => {
      filterArr.push({ type: Filters.school, filter: s.name });
      output.push({
        name: s.name,
        coords: s.coords,
        // filter by school name only
        population: localStudents(s.name).length,
        filteredPop: proFilter(filterArr).length
      });
      filterArr.pop();
    });
    return output;
  },

  /**
   * Returns an array of college names, relevant map coordinates,
   * a colour, and two numbers - one a total and the other filtered.
   * @param filterArr An array of filters to apply.
   */
  getColleges: (filterArr: Filter[]): CollegeObject[] => {
    const output = new Array<CollegeObject>();
    Colleges.forEach(c => {
      filterArr.push({ type: Filters.college, filter: c.name });
      output.push({
        name: c.name,
        coords: c.coords,
        colour: c.colour,
        // filter by college name only
        population: localStudents(c.name).length,
        filteredPop: proFilter(filterArr).length
      });
    });
    return output;
  }
};

/**
 * Returns a student array that is filtered based on the location input.
 * @param location Name of a school or college.
 */
const localStudents = (location: SchoolName | CollegeName): Student[] => {
  // set type to SchoolName or CollegeName depending on input category
  // sets to undefined as a catch if neither category is met
  const type = Object.values(SchoolName).includes(location as SchoolName)
    ? "school"
    : Object.values(CollegeName).includes(location as CollegeName)
    ? "college"
    : undefined;
  if (type !== undefined) {
    return Students.filter(s => {
      return s[type] === location;
    });
  }
  return new Array<Student>();
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
  // if a filter does not match a student, remove the student
  const outS = Students.filter(s => {
    fArr.forEach(f => {
      if (s[f.type] !== f.filter.toString()) {
        return false;
      }
    });
  });
  // return filtered students array
  return outS;
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
export const filtersArr: Filter[] = [genderFilter, courseFilter, collegeFilter];

/**
 * Returns a student array that is filtered based on the name input.
 * @param name Name of a school or college.
 * @param students Optional. A student array to filter. Filters all students if not defined.
 */
export const LocalStudentsOld = (
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

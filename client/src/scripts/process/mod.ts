import {
  CourseType,
  Gender,
  CollegeName,
  SchoolName,
  Filters
} from "../shared/enums";
import {
  Filter,
  Student,
  College,
  School,
  Population
} from "../shared/interfaces";
import { Colleges } from "./colleges";
import { Students } from "./students";
import { Schools } from "./schools";
import { LatLngExpression } from "leaflet";
import { Colour } from "../shared/icons";

interface LocationObject {
  name: SchoolName | CollegeName;
  coords: LatLngExpression;
  population: number;
  filteredPop: number;
  colour?: Colour;
}

export const FILTER = {
  /**
   * Returns an array of school names, relevant map coordinates, and two
   * counts of students attending the school - one a total and the other filtered.
   * @param filterArr An array of filters to apply.
   */
  getSchools: (filterArr: Filter[]): LocationObject[] | undefined => {
    return getStudents(filterArr, "school");
  },

  /**
   * Returns an array of college names, relevant map coordinates,
   * a colour, and two numbers - one a total and the other filtered.
   * @param filterArr An array of filters to apply.
   */
  getColleges: (filterArr: Filter[]): LocationObject[] | undefined => {
    return getStudents(filterArr, "college");
  },

  /**
   * Returns a number of Students within a School or College.
   * @param location A SchoolName or CollegeName
   */
  thisLocation: (
    filterArr: Filter[],
    location: SchoolName | CollegeName
  ): Population => {
    const localS = localStudents(location);
    return {
      total: localS.length,
      filtered: applyFilters(filterArr, localS).length
    };
  }
};

/**
 * Returns an array of objects, each with a location name, relevant map coordinates,
 * two counts of students attending the school (one a total and the other
 * filtered), and optionally a colour.
 * @param filterArr An array of filters to be applied.
 * @param location A string to define which location is having its students listed.
 */
const getStudents = (
  filterArr: Filter[],
  location: "school" | "college"
): LocationObject[] | undefined => {
  const output = new Array<LocationObject>();
  const locations =
    location === "school"
      ? Schools
      : location === "college"
      ? Colleges
      : undefined;
  if (locations !== undefined) {
    locations.forEach((l: College | School) => {
      const colour: Colour | undefined = (l as College).colour;
      const localS = localStudents(l.name);
      output.push({
        name: l.name,
        coords: l.coords,
        population: localS.length,
        filteredPop: applyFilters(filterArr, localS).length,
        colour: colour
      });
    });
    return output;
  }

  /**
   * Returns an array of college names, relevant map coordinates,
   * a colour, and two numbers - one a total and the other filtered.
   * @param filterArr An array of filters to apply.
   */
  (filterArr: Filter[]): LocationObject[] | undefined => {
    return getStudents(filterArr, "college");
  };
};

/**
 * Returns a student array that is filtered based on the location input only.
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
const applyFilters = (
  filterArr: Filter[],
  studentArr: Student[]
): Student[] => {
  // remove blank filters
  const fArr = filterArr.filter(f => {
    return f.filter !== "";
  });
  // if a filter does not match a student, remove the student
  const outS = studentArr.filter(s => {
    let output = true;
    // check every filter for a conflict
    fArr.forEach(f => {
      if (s[f.type] !== f.filter) {
        output = false;
      }
    });
    // return true if all filters pass
    return output;
  });
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
export const applyFiltersOld = (studentsArr: Student[], filters?: Filter[]) => {
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

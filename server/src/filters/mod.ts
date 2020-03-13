import { students, Student, StudentProperty } from '../data/mod';

const FilterFuncs = {
  /**
   * Returns what category the Filter comes from as a string that
   * matches a student property.
   * @param filter A Filter.
   */
  filterType: function(filter: Filter): StudentProperty {
    switch (true) {
      case isGender(filter):
        return 'gender' as StudentProperty;
      case isCourse(filter):
        return 'course' as StudentProperty;
      default:
        throw '"filter" is not amongst acceptable strings.';
    }
  },

  /**
   * Returns a boolean, which is true if the filter value
   * is included in the Enumerator's values.
   * @param filter A Filter.
   * @param E An Enumerator.
   */
  isType: function(filter: Filter, E: Enumerator): boolean {
    return Object.values(E).includes(filter as any);
  },
};

export type Filter = GenderFilter | CourseFilter;

type GenderFilter = 'male' | 'female';
function isGender(str: string): str is GenderFilter {
  return str == 'male' || str == 'female';
}

type CourseFilter = 'a-level' | 'vocational' | 'applied-general';
function isCourse(str: string): str is CourseFilter {
  return str == 'a-level' || str == 'vocational' || str == 'applied-general';
}

function isFilter(str: string): str is Filter {
  return (
    str == 'male' ||
    str == 'female' ||
    str == 'a-level' ||
    str == 'vocational' ||
    str == 'applied-general'
  );
}

function isFilterOrThrow(str: string): str is Filter {
  if (!isFilter(str)) throw `${str} not and instance of Filter`;
  return true;
}

export function parseQueries(
  _gender: string | undefined,
  _course: string | undefined,
): Filter[] {
  const course: string[] = _course != null ? _course.split(',') : [];
  const gender: string[] = _gender != null ? [_gender] : [];
  return course.concat(gender).filter(isFilterOrThrow);
}

export function applyFilters(filters: Filter[]): Student[] {
  // TODO make this do something. @layton
  /**
   * Returns an array of students which fit the supplied filter.
   * @param filter A Filter to be applied.
   * @param studentArr An array of Students to be filtered.
   */
  function applyFilter(filter: Filter, studentArr: Student[]): Student[] {
    throw 'unimplimented';
  }
  let filteredStudents = students;
  for (const filter of filters) {
    filteredStudents = applyFilter(filter, filteredStudents);
  }
  return filteredStudents;
}

export interface SchoolInfo {
  name: string;
  coordinates: Coordinates;

  numMatchingStudents: number;
}

export interface OutcodeInfo {
  outcode: string;
  coordinates: Coordinates;

  numMatchingStudents: number;
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

//TODO make this do something. @layton
// Counts Students from different schools producing `SchoolInfo[]`
export function studentsFromSchools(studnets: Student[]): SchoolInfo[] {
  throw 'unimplemented';
}

//TODO make this do something. @layton
// Counts Students from different outcodes producing `OutcodeInfo[]`
export function studentsFromOutcodes(studnets: Student[]): OutcodeInfo[] {
  throw 'unimplemented';
}

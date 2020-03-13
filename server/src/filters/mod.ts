import { students, Student } from '../data/mod';

// const FilterFuncs = {
//   /**
//    * Returns what enum the Filter comes from.
//    * @param filter A Filter.
//    */
//   filterType: function(
//     filter: Filter,
//   ): typeof GenderFilter | typeof CourseFilter {
//     return [GenderFilter, CourseFilter].find(f => {
//       return Object.values(f).includes(filter as any);
//     });
//   },

//   /**
//    * Returns a boolean, which is true if the filter value
//    * is included in the Enumerator's values.
//    * @param filter A Filter.
//    * @param E An Enumerator.
//    */
//   isType: function(filter: Filter, E: Enumerator): boolean {
//     return Object.values(E).includes(filter as any);
//   },
// };

export type Filter = GenderFilter | CourseFilter;

export type GenderFilter = 'male' | 'female';

export type CourseFilter = 'a-level' | 'vocational' | 'applied-general';

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

export function parseQueries(_gender?: string, _course?: string): Filter[] {
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

import { students, Student } from '../data/mod';

export type Filter = GenderFilter | CourseFilter;

export enum GenderFilter {
  Male = 'male',
  Female = 'female',
}

export enum CourseFilter {
  alevel = 'a-level',
  vocational = 'vocational',
  appgeneral = 'applied-general',
}

export function parseQueries(_gender?: string, _course?: string): Filter[] {
  const course: CourseFilter[] =
    _course != null ? _course.split(',').map(x => CourseFilter[x]) : [];
  const gender: GenderFilter[] = _gender != null ? [GenderFilter[_gender]] : [];
  return (course as Filter[]).concat(gender);
}

export function applyFilters(filters: Filter[]): Student[] {
  //TODO make this do something. @layton
  // Applies a single filter retuning only the students that match the filter.
  function applyFilter(students: Student[], filter: Filter): Student[] {
    throw 'unimplemented';
  }
  let filteredStudents = students;
  for (const filter of filters) {
    filteredStudents = applyFilter(filteredStudents, filter);
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

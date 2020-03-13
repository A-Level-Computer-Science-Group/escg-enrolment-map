import {
  students,
  Student,
  StudentProperty,
  schools,
  School,
  colleges,
  College,
} from '../data/mod';

export type Filter = GenderFilter | CourseFilter;

type GenderFilter = 'male' | 'female';
function isGenderFilter(str: string): str is GenderFilter {
  return str == 'male' || str == 'female';
}

type CourseFilter = 'a-level' | 'vocational' | 'applied-general';
function isCourseFilter(str: string): str is CourseFilter {
  return str == 'a-level' || str == 'vocational' || str == 'applied-general';
}

function isFilter(str: string): str is Filter {
  return isGenderFilter(str) || isCourseFilter(str);
}

function isFilterOrThrow(str: string): str is Filter {
  if (!isFilter(str)) throw `${str} not and instance of Filter`;
  return true;
}

export function parseQueries(
  _gender: string | undefined,
  _course: string | undefined,
): Filter[] {
  const course = _course != null ? _course.split(',') : [];
  const gender = _gender != null ? [_gender] : [];
  return course.concat(gender).filter(isFilterOrThrow);
}

/**
 * Returns an array of students which fit the supplied filter.
 * @param filter A Filter to be applied.
 * @param studentArr An array of Students to be filtered.
 */
function applyFilter(filter: Filter, studentArr: Student[]): Student[] {
  function studentMatchesFilter(student: Student): boolean {
    if (isCourseFilter(filter)) {
      let key;
      switch (filter) {
        case 'a-level':
          key = 'A Level';
        case 'vocational':
          key = 'Vocational'; // can't find any students doing vocational in data.
        case 'applied-general':
          key = 'Applied General';
      }
      return student.QualificationType == key;
    } else if (isGenderFilter(filter)) {
      let key;
      switch (filter) {
        case 'male':
          key = 'M';
        case 'female':
          key = 'F';
      }
      return student.Sex == key;
    }
    throw 'Unreachable: all possible filters checked before this point.';
  }

  return studentArr.filter(studentMatchesFilter);
}

export function applyFilters(filters: Filter[]): Student[] {
  let filteredStudents = students;
  for (const filter of filters)
    filteredStudents = applyFilter(filter, filteredStudents);
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

type Coordinates = [number, number];

/**
 * Counts Students from different schools producing `SchoolInfo[]`
 * @param students A Student array.
 */
export function getSchoolsFromStudents(students: Student[]): SchoolInfo[] {
  const output: SchoolInfo[] = [];
  schools.forEach(sch => {
    output.push({
      name: sch.name,
      coordinates: sch.coords,
      numMatchingStudents: students.filter(s => {
        return s.School == sch.name;
      }).length,
    });
  });
  return output;
}

//TODO make this do something. @layton
// Counts Students from different outcodes producing `OutcodeInfo[]`
export function studentsFromOutcodes(students: Student[]): OutcodeInfo[] {
  throw 'unimplemented';
}

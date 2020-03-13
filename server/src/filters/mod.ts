import { students, Student, StudentProperty } from '../data/mod';
import {
  HttpService,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

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
  if (!isFilter(str))
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
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
    throw new HttpException(
      'Unreachable: all possible filters checked before this point.',
      HttpStatus.EXPECTATION_FAILED,
    );
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
  coordinates: Coordinates | null;
  numMatchingStudents: number;
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

//TODO make this do something. @layton
// Counts Students from different schools producing `SchoolInfo[]`
export function studentsFromSchools(studnets: Student[]): SchoolInfo[] {
  throw new HttpException('unimplemented', HttpStatus.EXPECTATION_FAILED);
}

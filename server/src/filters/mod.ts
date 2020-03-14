import { HttpException, HttpStatus } from '@nestjs/common';
import { students, Student, schools } from '../data/mod';
import { e2e } from 'escg-enrolment-map-core';

export interface ApplyableFilter {
  studentMatchesFilter(student: Student): boolean;
}

export class GenderFilter implements ApplyableFilter {
  type: GenderFilterType;
  constructor(_type: GenderFilterType) {
    this.type = _type;
  }
  studentMatchesFilter(student: Student): boolean {
    let key;
    switch (this.type) {
      case 'male':
        key = 'M';
      case 'female':
        key = 'F';
    }
    return student.Sex == key;
  }
}

type GenderFilterType = 'male' | 'female';
function isGenderFilterType(str: string): str is GenderFilterType {
  return str == 'male' || str == 'female';
}
function isGenderFilterThrow(str: string): str is GenderFilterType {
  if (!isGenderFilterType(str))
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  return true;
}

export class CourseFilter implements ApplyableFilter {
  // Multiple filters possible for course.
  types: CourseFilterType[];
  constructor(_types: CourseFilterType[]) {
    this.types = _types;
  }
  studentMatchesFilter(student: Student): boolean {
    const keys = [];
    for (const type of this.types)
      switch (type) {
        case 'a-level':
          keys.push('A Level');
        case 'vocational':
          keys.push('Vocational'); // can't find any students doing vocational in data.
        case 'applied-general':
          keys.push('Applied General');
      }
    return keys.includes(student.QualificationType);
  }
}
type CourseFilterType = 'a-level' | 'vocational' | 'applied-general';
function isCourseFilterType(str: string): str is CourseFilterType {
  return str == 'a-level' || str == 'vocational' || str == 'applied-general';
}

function isCourseFilterThrow(str: string): str is CourseFilterType {
  if (!isCourseFilterType(str))
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  return true;
}

export function parseQueries(
  _gender: string | undefined,
  _course: string | undefined,
): ApplyableFilter[] {
  const filters = [];
  if (_course != null)
    filters.push(
      new CourseFilter(_course.split(',').filter(isCourseFilterThrow)),
    );
  if (_gender != null && isGenderFilterThrow(_gender))
    filters.push(new GenderFilter(_gender));
  return filters;
}

/**
 * Returns an array of students which fit the supplied filter.
 * @param filter A Filter to be applied.
 * @param studentArr An array of Students to be filtered.
 */
function applyFilter(
  filter: ApplyableFilter,
  studentArr: Student[],
): Student[] {
  function studentMatchesFilter(student: Student): boolean {
    return filter.studentMatchesFilter(student);
  }

  return studentArr.filter(studentMatchesFilter);
}

export function applyFilters(filters: ApplyableFilter[]): Student[] {
  let filteredStudents = students;
  for (const filter of filters)
    filteredStudents = applyFilter(filter, filteredStudents);
  return filteredStudents;
}

/**
 * Counts Students from different schools producing `SchoolInfo[]`
 * @param students A Student array.
 */
export function getSchoolsFromStudents(students: Student[]): e2e.SchoolInfo[] {
  const output: e2e.SchoolInfo[] = [];
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

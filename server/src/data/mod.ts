import _students from './StudentData_03_03_2020.json';
import { _schools, School } from './SchoolData';
import { _colleges, College } from './CollegeData';

// TODO Validate the data.
export const students: Student[] = _students;
export const schools = _schools();
export const colleges = _colleges();
export { School, College };

// TODO replace most of these uses of String with custom types.
export interface Student {
  FTEnrolmentID: number;
  Year: string;
  Sex: string;
  Campus: string;
  PostCodePart1: string;
  QualificationType: string;
  School: string;
}

export type StudentProperty =
  | 'Campus'
  | 'FTEnrolmentID'
  | 'PostCodePart1'
  | 'QualificationType'
  | 'School'
  | 'Sex'
  | 'Year';

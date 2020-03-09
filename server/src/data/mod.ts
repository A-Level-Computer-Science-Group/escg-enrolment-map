import _students from './StudentData_03_03_2020.json';

// TODO Validate the data.
export const students: Student[] = _students;

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

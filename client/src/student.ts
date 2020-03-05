import { College, CourseType, Gender, SchoolName } from "./enums";

export interface Student {
  gender: Gender;
  course: CourseType;
  school: SchoolName;
  college: College;
  postcode?: string;
  year?: number;
}

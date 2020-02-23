import * as Enum from "./enums";

export interface Student {
  gender: Enum.Gender;
  course: Enum.CourseType;
  school: Enum.SchoolName;
  college: Enum.College;
  postcode?: string;
  year?: number;
}

import { College, CourseType, Gender, SchoolName } from "./enums";

export interface Student {
  gender: Gender;
  course: CourseType;
  school: SchoolName;
  college: College;
  postcode?: string;
  year?: number;
}

// example students
export const studentInfo: Student[] = [
  {
    gender: Gender.male,
    course: CourseType.vocational,
    school: SchoolName.ocklynge,
    college: College.eastbourne
  },
  {
    gender: Gender.male,
    course: CourseType.vocational,
    school: SchoolName.ocklynge,
    college: College.eastbourne
  },
  {
    gender: Gender.male,
    course: CourseType.alevel,
    school: SchoolName.ocklynge,
    college: College.eastbourne
  },
  {
    gender: Gender.female,
    course: CourseType.alevel,
    school: SchoolName.parklands,
    college: College.eastbourne
  },
  {
    gender: Gender.female,
    course: CourseType.alevel,
    school: SchoolName.parklands,
    college: College.eastbourne
  },
  {
    gender: Gender.female,
    course: CourseType.vocational,
    school: SchoolName.parklands,
    college: College.eastbourne
  }
];

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
    school: SchoolName.Ocklynge,
    college: College.eastbourne
  },
  {
    gender: Gender.male,
    course: CourseType.vocational,
    school: SchoolName.Ocklynge,
    college: College.eastbourne
  },
  {
    gender: Gender.male,
    course: CourseType.alevel,
    school: SchoolName.Ocklynge,
    college: College.eastbourne
  },
  {
    gender: Gender.female,
    course: CourseType.alevel,
    school: SchoolName.Parklands,
    college: College.eastbourne
  },
  {
    gender: Gender.female,
    course: CourseType.alevel,
    school: SchoolName.Parklands,
    college: College.eastbourne
  },
  {
    gender: Gender.female,
    course: CourseType.vocational,
    school: SchoolName.Parklands,
    college: College.eastbourne
  }
];

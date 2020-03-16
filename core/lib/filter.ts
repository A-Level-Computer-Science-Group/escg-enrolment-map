export type GenderType = "male" | "female";
export interface IGender {
  type: GenderType;
}

export function isGenderType(str: string): str is GenderType {
  return str == "male" || str == "female";
}

export interface ICourse {
  types: CourseType[];
}

export type CourseType = "a-level" | "vocational" | "applied-general";

export function isCourseType(str: string): str is CourseType {
  return str == "a-level" || str == "vocational" || str == "applied-general";
}

export interface Filters {
  genderFilter: IGender | undefined;
  courseFilters: ICourse | undefined;
}

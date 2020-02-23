import { CourseType, Filters } from "./enums";
import { Filter, Student } from "./interfaces";

const courseFilter: Filter = {
  type: Filters.course,
  filter: CourseType.alevel
};
const genderFilter: Filter = {
  type: Filters.gender,
  filter: ""
};
const collegeFilter: Filter = {
  type: Filters.college,
  filter: ""
};
export const filtersArr = [genderFilter, courseFilter, collegeFilter];

export function applyFilters(studentsArr: Student[]) {
  if (
    // if any filters are defined
    filtersArr.findIndex(f => {
      return f.filter !== "";
    }) !== -1
  ) {
    // apply each filter to the incoming array and then re-assign the array
    filtersArr.forEach(f => {
      if (f.filter !== "") {
        studentsArr = studentsArr.filter(s => {
          return s[f.type] === f.filter;
        });
      }
    });
  }
  return studentsArr;
}

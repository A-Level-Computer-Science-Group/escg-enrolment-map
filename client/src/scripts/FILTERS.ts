import { CourseType, Gender, College, Filters } from "./enums";
import { Filter, Student } from "./interfaces";

export const courseFilter: Filter = {
  type: Filters.course,
  filter: ""
};
export const genderFilter: Filter = {
  type: Filters.gender,
  filter: ""
};
export const collegeFilter: Filter = {
  type: Filters.college,
  filter: ""
};
export const filtersArr = [genderFilter, courseFilter, collegeFilter];

export function applyFilters(studentsArr: Student[], filters?: Filter[]) {
  if (!filters) {
    filters = filtersArr;
  }
  if (
    // if any filters are defined
    filters.findIndex(f => {
      return f.filter !== "";
    }) !== -1
  ) {
    // apply each filter to the incoming array and then re-assign the array
    filters.forEach(f => {
      if (f.filter !== "") {
        studentsArr = studentsArr.filter(s => {
          return s[f.type] === f.filter;
        });
      }
    });
  }
  return studentsArr;
}

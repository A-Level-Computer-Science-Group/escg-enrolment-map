import * as L from "leaflet";
import * as INIT from "./initialize";
import { CourseType, Gender, CollegeName, Filters } from "./shared/enums";
import { courseFilter, genderFilter, collegeFilter } from "./process/mod";
import {
  SchoolMarker,
  PopupTextOld,
  LocalStudentsOld,
  CollegeMarker,
  Filter
} from "./shared/interfaces";

// PULL IN SUPPLIED INFO AND FILTERS
import { Students } from "./process/students";
import { filtersArr, applyFiltersOld } from "./process/mod";
import { Student } from "./shared/interfaces";

import { toggleTick, toggleGrey, updateFilter, removeTicks } from "./button";

// map variables
const maxRadius = 1500;
/**
 * When a button is clicked it toggles ticked and grey and set specific filter.
 * If any other buttons are ticked, they are unticked.
 * @param e The referenced HTML button.
 * @param filter The string filter the button references.
 */
(window as any).buttonToggle = (e: HTMLButtonElement, filter: string) => {
  toggleTick(e);
  toggleGrey(e);
  if (filter) {
    updateFilter(e);
  }
  removeTicks(e);
};
/**
 * Returns a boolean to represent success.
 * The two parameters shall set the specified filter equal to the supplied value.
 * @param filter Must contain "course", "gender", or "college" else the command shall fail.
 * @param newVal Must contain an enum from the appropriate category.
 */
(window as any).setFilter = (filter: string, newVal: string): boolean => {
  let myFilter: Filter;
  let myType;
  switch (filter) {
    case "course":
      myFilter = courseFilter;
      myType = CourseType;
      break;
    case "gender":
      myFilter = genderFilter;
      myType = Gender;
      break;
    case "college":
      myFilter = collegeFilter;
      myType = CollegeName;
      break;
    default:
      return false;
  }
  if (newVal in myType || "none") {
    // finalVal = the appropriate enumerator or an empty string if not found
    const finalVal = (myType as any)[newVal] ? (myType as any)[newVal] : "";
    myFilter.filter = finalVal;
    // for each school, adjust the radius, colours and popups
    schoolMarkers.forEach(s => {
      const studentArr =
        LocalStudentsOld(collegeFilter.filter as CollegeName).length !== 0
          ? LocalStudentsOld(collegeFilter.filter as CollegeName)
          : Students;
      s.filtered.setRadius(
        calcRadius(applyFiltersOld(LocalStudentsOld(s.name)).length, studentArr)
      );
      // Applies school and college filters to outline radius
      s.total.setRadius(
        calcRadius(
          LocalStudentsOld(
            s.name,
            LocalStudentsOld(collegeFilter.filter as Filters.college)
          ).length,
          studentArr
        )
      );
      // when college filter is changed set colours for all schools
      if (filter === "college") {
        let newColour: "purple" | "orange" | "green" | "blue";
        let newHash: string | "#CB8427";
        switch (newVal) {
          case "eastbourne":
            newColour = "orange";
            newHash = "#dea400";
            break;
          case "lewes":
            newColour = "blue";
            newHash = "#0094ee";
            break;
          case "hastings":
            newColour = "green";
            newHash = "#5ede00";
            break;
          default:
            newColour = "purple";
            newHash = "#960096";
            break;
        }
        [s.filtered, s.total].forEach(m => {
          m.setStyle({
            color: newColour,
            fillColor: newHash
          });
        });
      }
      s.total.bindPopup(PopupTextOld(s.name, filtersArr, true));
    });
    // for each college, adjust the popups
    collegeMarkers.forEach(c => {
      c.marker.bindPopup(PopupTextOld(c.name, filtersArr, true));
    });
    return true;
  }
  return false;
};

/* *** MAP STUFF *** */
const mymap = L.map("map").setView([50.78829, 0.271392], 14);

// add map tiles (can't use this commercially without buying an access key)
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
}).addTo(mymap);

// get an array of all colleges as markers and add them to the map
const collegeMarkers = INIT.CollegesOld();
collegeMarkers.forEach(c => {
  c.marker.addTo(mymap);
});

// get an array of all schools as markers and add them to the map
const schoolMarkers = INIT.SchoolsOld();
schoolMarkers.forEach(s => {
  s.filtered.addTo(mymap);
  s.total.addTo(mymap);
});

export function calcRadius(filteredS: number, studentArr: Student[]) {
  return (filteredS / studentArr.length) * maxRadius;
}

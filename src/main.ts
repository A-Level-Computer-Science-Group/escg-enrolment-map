import * as L from "leaflet";
import * as INIT from "./initialize";
import { CourseType, Gender, College, Filters } from "./enums";
import { courseFilter, genderFilter, collegeFilter } from "./FILTERS";
import {
  SchoolMarker,
  PopupText,
  LocalStudents,
  CollegeMarker,
  Filter
} from "./interfaces";

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
      myType = College;
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
        LocalStudents(collegeFilter.filter as College).length !== 0
          ? LocalStudents(collegeFilter.filter as College)
          : studentInfo;
      s.filtered.setRadius(
        calcRadius(applyFilters(LocalStudents(s.name)).length, studentArr)
      );
      // Applies school and college filters to outline radius
      s.total.setRadius(
        calcRadius(
          LocalStudents(
            s.name,
            LocalStudents(collegeFilter.filter as Filters.college)
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
      s.total.bindPopup(PopupText(s.name, filtersArr, true));
    });
    // for each college, adjust the popups
    collegeMarkers.forEach(c => {
      c.marker.bindPopup(PopupText(c.name, filtersArr, true));
    });
    return true;
  }
  return false;
};

/* *** MAP STUFF *** */
const mymap = L.map("map").setView([50.78829, 0.271392], 14);

// add map tiles (can't use this commercially without buying an access key)
L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1IjoibGF5dG9uZ2IiLCJhIjoiY2s2aHZtandrMjkybTNrbXYzbzdvN3NtaCJ9.3iCAYC_Jxjf77q4-osWKzA"
  }
).addTo(mymap);

// PULL IN SUPPLIED INFO AND FILTERS
import { studentInfo } from "./RandomData";
import { filtersArr, applyFilters } from "./FILTERS";
import { Student } from "./student";

// map variables
const maxRadius: number = 1500;

// get an array of all colleges as markers and add them to the map
const collegeMarkers = INIT.Colleges();
collegeMarkers.forEach(c => {
  c.marker.addTo(mymap);
});

// get an array of all schools as markers and add them to the map
const schoolMarkers = INIT.Schools();
schoolMarkers.forEach(s => {
  s.filtered.addTo(mymap);
  s.total.addTo(mymap);
});

export function calcRadius(filteredS: number, studentArr: Student[]) {
  return (filteredS / studentArr.length) * maxRadius;
}

import * as L from "leaflet";
import { CourseType, SchoolName, Gender, College } from "./enums";
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
    // for each school, adjust the filtered radius and popups
    schoolMarkers.forEach(s => {
      let studentArr =
        LocalStudents(collegeFilter.filter as College).length !== 0
          ? LocalStudents(collegeFilter.filter as College)
          : studentInfo;
      s.filtered.setRadius(
        calcRadius(applyFilters(LocalStudents(s.name)).length, studentArr)
      );
      s.total.setRadius(
        calcRadius(applyFilters(LocalStudents(s.name)).length, studentArr)
      );
      s.total.bindPopup(PopupText(s.name, filtersArr, true));
    });
    // for each college, adjust the popups
    collegeMarkers.forEach(c => {
      let setFilters = filtersArr.filter(f => {
        f.filter !== "";
      });
      let totalLine =
        setFilters.length === 1 && setFilters[0].filter in College;
      c.marker.bindPopup(PopupText(c.name, filtersArr, totalLine));
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
import { schools } from "./schools";
import { filtersArr, applyFilters } from "./FILTERS";
import { Student } from "./student";

// map variables
const maxRadius: number = 1500;

// add ESCG Eastbourne to map
const collegeMarkers = new Array<CollegeMarker>();
const ESCG_EASTBOURNE = L.marker([50.78829, 0.271392]).addTo(mymap);
ESCG_EASTBOURNE.bindPopup(
  PopupText(College.eastbourne, filtersArr, true)
).openPopup();
collegeMarkers.push({ name: College.eastbourne, marker: ESCG_EASTBOURNE });
/*  create 2 markers for each school -
    - marker 1 total students - transparent radius
    - marker 2 filtered students - stroke only
*/
const schoolMarkers = new Array<SchoolMarker>();
schools.forEach(school => {
  const schoolCount = LocalStudents(school.name).length;
  const filterCount = applyFilters(LocalStudents(school.name)).length;
  const transparentMarker = L.circle(school.coords, {
    color: "red",
    stroke: false,
    fillColor: "#f03",
    fillOpacity: 0.5,
    radius: calcRadius(filterCount, studentInfo)
  }).addTo(mymap);
  const outlineMarker = L.circle(school.coords, {
    color: "red",
    fillOpacity: 0,
    radius: calcRadius(schoolCount, studentInfo)
  }).addTo(mymap);
  outlineMarker.bindPopup(PopupText(school.name, filtersArr, true));
  schoolMarkers.push({
    name: school.name,
    total: outlineMarker,
    filtered: transparentMarker
  });
});

function calcRadius(filteredS: number, studentArr: Student[]) {
  return (filteredS / studentArr.length) * maxRadius;
}

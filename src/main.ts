import * as _ from "lodash";
import * as L from "leaflet";
import { CourseType, SchoolName, Gender, College } from "./enums";
import {
  SchoolMarker,
  PopupText,
  LocalStudents,
  CollegeMarker
} from "./interfaces";

module.exports = {
  setGenderFilter: function(newFilter: string) {
    // if the new value is amongst the filters
    if (checkFilter(newFilter)) {
      // adjust the popups of colleges
      collegeMarkers.forEach(c => {
        c.marker.bindPopup(PopupText(c.name, filtersArr));
      });
      // adjust the radius and popups of all schools
      schoolMarkers.forEach(c => {
        c.marker.setRadius(calcRadius(applyFilters(LocalStudents(c.name)).length))
        c.marker.bindPopup(PopupText(c.name, filtersArr));
      });
    }
  }
};

const gender = document.getElementById("gender") as HTMLSelectElement;

function checkFilter(filter: string): boolean {
  return (
    (Object as any).values(CourseType).includes(filter) ||
    (Object as any).values(SchoolName).includes(filter) ||
    (Object as any).values(Gender).includes(filter)
  );
}

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
import { studentInfo } from "./student";
import { schools } from "./schools";
import { filtersArr, applyFilters } from "./FILTERS";

// map variables
const maxRadius: number = 1500;

// add ESCG Eastbourne to map
const collegeMarkers = new Array<CollegeMarker>();
const ESCG_EASTBOURNE = L.marker([50.78829, 0.271392]).addTo(mymap);
ESCG_EASTBOURNE.bindPopup(
  PopupText(College.eastbourne, filtersArr, true)
).openPopup();
collegeMarkers.push({ name: College.eastbourne, marker: ESCG_EASTBOURNE });

// create a marker for each school, add marker to array of markers
const schoolMarkers = new Array<SchoolMarker>();
schools.forEach(school => {
  const schoolCount = applyFilters(LocalStudents(school.name)).length;
  const newMarker = L.circle(school.coords, {
    color: "red",
    fillColor: "#f03",
    fillOpacity: 0.5,
    radius: calcRadius(schoolCount)
  }).addTo(mymap);
  newMarker.bindPopup(PopupText(school.name, filtersArr));
  schoolMarkers.push({ name: school.name, marker: newMarker });
});

function calcRadius(students: number) {
  return (students / studentInfo.length) * maxRadius;
}

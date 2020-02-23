import * as L from "leaflet";
import { SchoolMarker } from "./interfaces";
import { FormatText } from "./formatter";
const formatter = new FormatText();

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
import { studentInfo } from "./studentInfo";
import { schools } from "./schools";
import { filtersArr, applyFilters } from "./FILTERS";

// map variables
const maxRadius: number = 1500;

// add ESCG Eastbourne to map
const ESCG_EASTBOURNE = L.marker([50.78829, 0.271392]).addTo(mymap);
ESCG_EASTBOURNE.bindPopup(
  "<b>ESCG<br>Eastbourne</b><br>Total Students: " + studentInfo.length
).openPopup();
// create a marker for each school, add marker to array of markers
const schoolMarkers: SchoolMarker[] = [];
schools.forEach(school => {
  const schoolCount = applyFilters(schoolStudents()).length;
  const newMarker = L.circle(school.coords, {
    color: "red",
    fillColor: "#f03",
    fillOpacity: 0.5,
    radius: calcRadius(schoolCount)
  }).addTo(mymap);
  newMarker.bindPopup(
    "<b>" +
      school.name +
      "</b><br>" +
      getDescriptors() +
      "Students: " +
      schoolCount
  );
  schoolMarkers.push({ name: school.name, marker: newMarker });

  function getDescriptors() {
    let descriptors = "";
    // capitalize the first letter of each filter and add it to the string
    filtersArr.forEach(f => {
      if (f.filter !== "") {
        descriptors += formatter.Capitalize(f.filter) + " ";
      }
    });
    if (descriptors === "") {
      return "Total ";
    } else {
      return descriptors;
    }
  }

  function schoolStudents() {
    return studentInfo.filter(s => {
      return s.school === school.name;
    });
  }

  function calcRadius(students: number) {
    return (students / studentInfo.length) * maxRadius;
  }
});

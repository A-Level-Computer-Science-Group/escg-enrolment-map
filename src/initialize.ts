import * as L from "leaflet";
import * as I from "./icons";
import { filtersArr, applyFilters } from "./FILTERS";
import {
  CollegeMarker,
  PopupText,
  Student,
  SchoolMarker,
  LocalStudents
} from "./interfaces";
import { College, SchoolName } from "./enums";
import { studentInfo } from "./RandomData";
import { calcRadius } from "./main";

/**
 * Returns an array of CollegeMarker objects that are not yet added to the map.
 */
export function Colleges() {
  return new Array<CollegeMarker>(
    makeCollege(College.eastbourne, [50.78829, 0.271392], I.Colour.orange),
    makeCollege(College.lewes, [50.870314, 0.015465], I.Colour.blue),
    makeCollege(College.hastings, [50.85811, 0.577994], I.Colour.green)
  );
}

function makeCollege(
  colName: College,
  coords: L.LatLngExpression,
  colour: I.Colour
) {
  const newCol = L.marker(coords, {
    icon: I.newIcon(colour)
  });
  newCol.bindPopup(PopupText(colName, filtersArr, true));
  return { name: colName, marker: newCol };
}

/**
 * Returns an array of SchoolMarker objects that are not yet added to the map.
 */
export function Schools() {
  return new Array<SchoolMarker>(
    makeSchool(SchoolName.parklands, [50.798574, 0.26842]),
    makeSchool(SchoolName.ocklynge, [50.785854, 0.255762])
  );
}

function makeSchool(schName: SchoolName, coords: L.LatLngExpression) {
  // create 2 markers for each school -
  const schoolCount = LocalStudents(schName).length;
  const filterCount = applyFilters(LocalStudents(schName)).length;
  // total students - transparent radius
  const transparentMarker = L.circle(coords, {
    color: "purple",
    stroke: false,
    fillColor: "#960096",
    fillOpacity: 0.5,
    radius: calcRadius(filterCount, studentInfo)
  });
  // filtered students - stroke only
  const outlineMarker = L.circle(coords, {
    color: "purple",
    fillOpacity: 0,
    radius: calcRadius(schoolCount, studentInfo)
  });
  outlineMarker.bindPopup(PopupText(schName, filtersArr, true));
  return {
    name: schName,
    filtered: transparentMarker,
    total: outlineMarker
  };
}

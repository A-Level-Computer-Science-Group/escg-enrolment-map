import * as L from "leaflet";
import * as I from "./icons";
import { filtersArr, applyFiltersOld } from "./process/mod";
import {
  CollegeMarker,
  PopupTextOld,
  Student,
  SchoolMarker,
  LocalStudentsOld
} from "./interfaces";
import { CollegeName, SchoolName } from "./enums";
import { Students } from "./process/students";
import { calcRadius } from "./main";
import { FILTER } from "./process/mod";

/**
 * Returns an array of college markers that are not yet added to the map.
 */
export const initColleges = (): CollegeMarker[] => {
  const output = new Array<CollegeMarker>();
  FILTER.getColleges(filtersArr).forEach(c => {
    output.push({
      name: c.name as CollegeName,
      marker: new L.Marker(c.coords, {
        icon: I.newIcon(c.colour as I.Colour)
      }).bindPopup(PopupTextOld(c.name, filtersArr, true))
    });
  });
  return output;
};

/**
 * Returns an array of school markers that are not yet added to the map.
 */
export const initSchools = (): SchoolMarker[] => {
  const output = new Array<SchoolMarker>();
  FILTER.getSchools(filtersArr).forEach(s => {
    // create 2 markers for each school
    output.push({
      name: s.name as SchoolName,
      // filtered students - transparent radius
      filtered: L.circle(s.coords, {
        color: "purple",
        stroke: false,
        fillColor: "#960096",
        fillOpacity: 0.5,
        radius: s.filteredPop
      }),
      // total students - stroke only
      total: L.circle(s.coords, {
        color: "purple",
        fillOpacity: 0,
        radius: s.population
      }).bindPopup(PopupTextOld(s.name, filtersArr, true))
    });
  });
  return output;
};

/**
 * Returns an array of CollegeMarker objects that are not yet added to the map.
 */
export function CollegesOld() {
  return new Array<CollegeMarker>(
    makeCollege(CollegeName.eastbourne, [50.78829, 0.271392], I.Colour.orange),
    makeCollege(CollegeName.lewes, [50.870314, 0.015465], I.Colour.blue),
    makeCollege(CollegeName.hastings, [50.85811, 0.577994], I.Colour.green)
  );
}

function makeCollege(
  colName: CollegeName,
  coords: L.LatLngExpression,
  colour: I.Colour
) {
  const newCol = L.marker(coords, {
    icon: I.newIcon(colour)
  });
  newCol.bindPopup(PopupTextOld(colName, filtersArr, true));
  return { name: colName, marker: newCol };
}

/**
 * Returns an array of SchoolMarker objects that are not yet added to the map.
 */
export function SchoolsOld() {
  return new Array<SchoolMarker>(
    makeSchool(SchoolName.parklands, [50.798574, 0.26842]),
    makeSchool(SchoolName.ocklynge, [50.785854, 0.255762])
  );
}

function makeSchool(schName: SchoolName, coords: L.LatLngExpression) {
  // create 2 markers for each school -
  const schoolCount = LocalStudentsOld(schName).length;
  const filterCount = applyFiltersOld(LocalStudentsOld(schName)).length;
  // total students - transparent radius
  const transparentMarker = L.circle(coords, {
    color: "purple",
    stroke: false,
    fillColor: "#960096",
    fillOpacity: 0.5,
    radius: calcRadius(filterCount, Students)
  });
  // filtered students - stroke only
  const outlineMarker = L.circle(coords, {
    color: "purple",
    fillOpacity: 0,
    radius: calcRadius(schoolCount, Students)
  });
  outlineMarker.bindPopup(PopupTextOld(schName, filtersArr, true));
  return {
    name: schName,
    filtered: transparentMarker,
    total: outlineMarker
  };
}

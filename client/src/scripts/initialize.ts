import * as L from "leaflet";
import * as I from "./shared/icons";
import { filtersArr, applyFiltersOld } from "./process/mod";
import {
  CollegeMarker,
  PopupTextOld,
  Student,
  SchoolMarker,
  LocalStudentsOld
} from "./shared/interfaces";
import { CollegeName, SchoolName } from "./shared/enums";
import { Students } from "./process/students";
import { calcRadiusOld } from "./main";
import { FILTER } from "./process/mod";

/**
 * Returns an array of college markers that are not yet added to the map.
 */
export const initColleges = (): CollegeMarker[] => {
  const a = FILTER.getColleges(filtersArr);
  if (a != undefined) {
    const output = new Array<CollegeMarker>();
    a.forEach(c => {
      output.push({
        name: c.name as CollegeName,
        marker: new L.Marker(c.coords, {
          icon: I.newIcon(c.colour as I.Colour)
        }).bindPopup(PopupTextOld(c.name, filtersArr, true))
      });
    });
    return output;
  } else {
    throw "filter returned undefined";
  }
};

/**
 * Returns an array of school markers that are not yet added to the map.
 */
export const initSchools = (): SchoolMarker[] => {
  const a = FILTER.getSchools(filtersArr);
  if (a != undefined) {
    const output = new Array<SchoolMarker>();
    a.forEach(s => {
      // create 2 markers for each school
      output.push({
        name: s.name as SchoolName,
        // filtered students - transparent radius
        filtered: L.circle(s.coords, {
          color: "purple",
          stroke: false,
          fillColor: "#960096",
          fillOpacity: 0.5,
          radius: calcRadiusOld(s.filteredPop, Students)
        }),
        // total students - stroke only
        total: L.circle(s.coords, {
          color: "purple",
          fillOpacity: 0,
          radius: calcRadiusOld(s.population, Students)
        }).bindPopup(PopupTextOld(s.name, filtersArr, true))
      });
    });
    return output;
  } else {
    throw "error";
  }
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
    radius: calcRadiusOld(filterCount, Students)
  });
  // filtered students - stroke only
  const outlineMarker = L.circle(coords, {
    color: "purple",
    fillOpacity: 0,
    radius: calcRadiusOld(schoolCount, Students)
  });
  outlineMarker.bindPopup(PopupTextOld(schName, filtersArr, true));
  return {
    name: schName,
    filtered: transparentMarker,
    total: outlineMarker
  };
}

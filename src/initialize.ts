import * as L from "leaflet";
import * as I from "./icons";
import { filtersArr } from "./FILTERS";
import { CollegeMarker, PopupText } from "./interfaces";
import { College } from "./enums";

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

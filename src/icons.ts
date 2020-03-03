import * as L from "leaflet";

export enum Colour {
  orange = "orange",
  green = "green",
  blue = "blue",
  purple = "purple"
}

/**
 * Returns a high-quality marker with the specified colour.
 * https://github.com/pointhi/leaflet-color-markers
 * @param colour Orange, green, blue, or purple.
 */
export function newIcon(colour: Colour): L.Icon {
  const i = new L.Icon({
    iconUrl:
      "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-" +
      colour +
      ".png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  return i;
}

import { Marker, LatLngExpression, LatLng, Circle } from "leaflet";
import * as L from "leaflet";

/* *** MAP STUFF *** */
var mymap = L.map("map").setView([50.78829, 0.271392], 14);

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
// add Eastbourne College
// var ESCG_eastbourne = L.marker([50.78829, 0.271392]).addTo(mymap);
// ESCG_eastbourne.bindPopup("<b>ESCG<br>Eastbourne</b>").openPopup();

// // create schools array
// enum College {
//   Eastbourne,
//   Hastings,
//   Lewes
// }

// interface school {
//   name: string;
//   coords: LatLng;
// }

// var schools: school[] = [];

// // PULL IN SUPPLIED INFO
// //example
// var parklands: school = {
//   name: "Parklands",
//   coords: new LatLng(50.798761, 0.269415)
// };
// schools.push(parklands);

// // create a marker for each school, add marker to array of markers
// interface SchoolMarker {
//   name: string;
//   marker: Marker | Circle;
// }
// var schoolMarkers: SchoolMarker[] = [];
// schools.forEach(school => {
//   var newMarker = L.circle(school.coords, {
//     color: "red",
//     fillColor: "#f03",
//     fillOpacity: 0.5,
//     radius: 500 // need to change this dynamically later
//   }).addTo(mymap);
//   newMarker.bindPopup(
//     "<b>" +
//       school.name +
//       "</b><br>" +
//       "total".slice(0, 1).toUpperCase() +
//       "total".slice(1) +
//       " Students: " +
//       500
//   );
//   schoolMarkers.push({ name: school.name, marker: newMarker });
// });

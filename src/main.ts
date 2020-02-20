import { Marker, LatLngExpression, LatLng, Circle } from "leaflet";
import * as L from "leaflet";

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

// add Eastbourne College
const ESCG_EASTBOURNE = L.marker([50.78829, 0.271392]).addTo(mymap);
ESCG_EASTBOURNE.bindPopup("<b>ESCG<br>Eastbourne</b>").openPopup();

enum College {
  Eastbourne,
  Hastings,
  Lewes
}
enum SchoolName {
  Parklands = "Parklands",
  Ocklynge = "Ocklynge"
}
enum CourseType {
  alevel = "A-Level",
  vocational = "Vocational",
  appgeneral = "Applied General"
}
enum Gender {
  Male,
  Female
}

interface School {
  name: SchoolName;
  coords: LatLng;
}
interface Student {
  gender: Gender;
  course: CourseType;
  school: SchoolName;
  college: College;
  postcode?: string;
  year?: number;
}

// PULL IN SUPPLIED INFO
// example schools
const schools: School[] = [
  {
    name: SchoolName.Parklands,
    coords: new LatLng(50.798574, 0.26842)
  },
  {
    name: SchoolName.Ocklynge,
    coords: new LatLng(50.785854, 0.255762)
  }
];
// example students
const studentInfo: Student[] = [
  {
    gender: Gender.Male,
    course: CourseType.vocational,
    school: SchoolName.Ocklynge,
    college: College.Eastbourne
  },
  {
    gender: Gender.Male,
    course: CourseType.vocational,
    school: SchoolName.Ocklynge,
    college: College.Eastbourne
  },
  {
    gender: Gender.Female,
    course: CourseType.alevel,
    school: SchoolName.Ocklynge,
    college: College.Eastbourne
  },
  {
    gender: Gender.Male,
    course: CourseType.alevel,
    school: SchoolName.Parklands,
    college: College.Eastbourne
  },
  {
    gender: Gender.Female,
    course: CourseType.alevel,
    school: SchoolName.Parklands,
    college: College.Eastbourne
  },
  {
    gender: Gender.Female,
    course: CourseType.vocational,
    school: SchoolName.Parklands,
    college: College.Eastbourne
  }
];

// map variables
const courseFilter: "any" | CourseType = CourseType.alevel;
const maxRadius: number = 1500;

// create a marker for each school, add marker to array of markers
interface SchoolMarker {
  name: SchoolName;
  marker: Marker | Circle;
}
const schoolMarkers: SchoolMarker[] = [];
schools.forEach(school => {
  const studentCount = studentsAtThisSchool(school.name);
  const newMarker = L.circle(school.coords, {
    color: "red",
    fillColor: "#f03",
    fillOpacity: 0.5,
    radius: calcRadius(studentCount)
  }).addTo(mymap);
  newMarker.bindPopup(
    "<b>" +
      school.name +
      "</b><br>" +
      courseFilter.slice(0, 1).toUpperCase() +
      courseFilter.slice(1) +
      " Students: " +
      studentCount
  );
  schoolMarkers.push({ name: school.name, marker: newMarker });

  function studentsAtThisSchool(schoolName: SchoolName) {
    return filterStudents(schoolName).length;
  }

  function calcRadius(students: number) {
    return (students / studentInfo.length) * maxRadius;
  }

  function filterStudents(schoolName: SchoolName) {
    return studentInfo.filter(s => {
      if (courseFilter === "any") {
        return s.school === schoolName;
      } else {
        return s.school === schoolName && s.course === courseFilter;
      }
    })
  }
});

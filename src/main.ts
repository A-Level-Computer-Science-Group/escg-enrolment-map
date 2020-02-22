import * as L from "leaflet";
import { Marker, LatLngExpression, LatLng, Circle } from "leaflet";
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

// add Eastbourne College
const ESCG_EASTBOURNE = L.marker([50.78829, 0.271392]).addTo(mymap);
ESCG_EASTBOURNE.bindPopup("<b>ESCG<br>Eastbourne</b>").openPopup();

enum College {
  eastbourne,
  hastings,
  lewes
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
  male = "Male",
  female = "Female"
}
enum Filters {
  college = "college",
  course = "course",
  gender = "gender"
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
    gender: Gender.male,
    course: CourseType.vocational,
    school: SchoolName.Ocklynge,
    college: College.eastbourne
  },
  {
    gender: Gender.male,
    course: CourseType.vocational,
    school: SchoolName.Ocklynge,
    college: College.eastbourne
  },
  {
    gender: Gender.male,
    course: CourseType.alevel,
    school: SchoolName.Ocklynge,
    college: College.eastbourne
  },
  {
    gender: Gender.female,
    course: CourseType.alevel,
    school: SchoolName.Parklands,
    college: College.eastbourne
  },
  {
    gender: Gender.female,
    course: CourseType.alevel,
    school: SchoolName.Parklands,
    college: College.eastbourne
  },
  {
    gender: Gender.female,
    course: CourseType.vocational,
    school: SchoolName.Parklands,
    college: College.eastbourne
  }
];

interface Filter {
  type: Filters;
  filter: CourseType | Gender | "";
}

// filters
const courseFilter: Filter = {
  type: Filters.course,
  filter: CourseType.vocational
};
const genderFilter: Filter = {
  type: Filters.gender,
  filter: ""
};
const collegeFilter: Filter = {
  type: Filters.college,
  filter: ""
};
const filtersArr = [genderFilter, courseFilter, collegeFilter];

// map variables
const maxRadius: number = 1050;

// create a marker for each school, add marker to array of markers
interface SchoolMarker {
  name: SchoolName;
  marker: Marker | Circle;
}
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
    return descriptors;
  }

  function applyFilters(studentsArr: Student[]) {
    // if no students array was supplied, use the full array
    // studentsArr = studentsArr ? studentsArr : studentInfo;
    if (
      // if any filters are defined
      filtersArr.findIndex(f => {
        return f.filter !== "";
      }) !== -1
    ) {
      // apply each filter to the incoming array and then re-assign the array
      filtersArr.forEach(f => {
        if (f.filter !== "") {
          studentsArr = studentsArr.filter(s => {
            return s[f.type] === f.filter;
          });
        }
      });
    }
    return studentsArr;
  }

  function schoolStudents() {
    return studentInfo.filter(s => {
      return s.school === school.name;
    });
  }

  function calcRadius(students: number) {
    return (students / applyFilters(studentInfo).length) * maxRadius;
  }
});

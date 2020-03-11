# ESCG Enrolment Map REST server

## API

### Paths

#### Schools

`/api/student-data/schools` should return json along the lines of.

```json
[
    {
        "schoolName"              :"Parklands",
        "coordinates"             :[50.798574, 0.26842],
        "NumberOfMatchingStudents": 80
    },
    {
        "schoolName"              :"Ocklynge",
        "coordinates"             :[50.785854, 0.25576],
        "NumberOfMatchingStudents": 70
    } 
]
```

#### Outcodes

`/api/student-data/outcodes` should return json along the lines of.

```json
[
    {
        "outcode"                 :"BN22",
        "coordinates"             :[50.798574, 0.26842],
        "NumberOfMatchingStudents": 80
    },
    {
        "outcode"                 :"BN21",
        "coordinates"             :[50.785854, 0.25576],
        "NumberOfMatchingStudents": 70
    } 
]
```

### Filters

Filters are applied as url queries.
For example, `/api/student-data/schools?gender=male&course=applied-general,a-level` should return the number of male students that applied for Applied General **or** A Level courses from different schools.


## Server responsibilities

To take best advantage of caching and to reduce the amount of data that has to be transferred to the client the server will have these responsibilities.

- To process the big data filtering of students and returning the number of students.
- To cache the results of processing to greatly increase speeds of repeat requests.
- To store and provide the coordinates of schools.
- To utilise a third party to convert outcodes to coordinates.
- To normalize any school names that refer to the same school.

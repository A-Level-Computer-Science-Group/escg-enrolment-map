# ESCG Enrolment Map REST server.

## API example.

`/api/student-data?gender=male&course=applied-general` should return.

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

## Server responsibilities.

To take best advantage of caching and to reduce the amount of data that has to be transferred to the client the server will have these responsibilities.

- To process the big data filtering the students and returning the number of students.
- To cache the results of processing to greatly increase speeds of repeat requests.
- To store and provide the coordinates of schools.
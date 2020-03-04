# ESCG Enrolment Map REST server.

## API example.

`/api/student-data?gender=male&course=applied-general,a-level` should return.

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

## Language choice.

The server will be written in typescript so that existing client side code can be easily moved to the server.

##### A more specific specification on particular technologies will be needed once this is approved.
# ESCG Enrolment Map REST server.

## API example.

`/api/student-data?gender=male&course=applied-general` should return.

```json
[
    {
        "schoolName"              :"Parklands",
        "cordinates"              :[50.798574, 0.26842],
        "NumberOfMatchingStudents": 80
    },
    {
        "schoolName"              :"Ocklynge",
        "cordinates"              :[50.785854, 0.25576],
        "NumberOfMatchingStudents": 70
    } 
]
```
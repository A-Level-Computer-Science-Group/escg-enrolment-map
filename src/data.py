import random

#set randomly named values to variables
schools = ["SchoolName.ocklynge", "SchoolName.parklands"]
gender = ["Gender.male", "Gender.female"]
courseType = ["CourseType.alevel", "CourseType.vocational", "CourseType.appgeneral"]
# collegeAttending = ["College.eastbourne", "College.hastings", "College.lewes"]
collegeAttending = ["College.eastbourne"]

#opens a .ts file and then writes to it
dataFile = open("./src/RandomData.ts", "w")
dataFile.write('import { CourseType, Gender, SchoolName, College } from "./enums";\nimport { Student } from "./student";\n\nexport const studentInfo:\nStudent[] = [\n')

#loops until condition is met and prints random data
for currentNumber in range(0,1000):
    schoolsRandom = random.randint(1,len(schools))
    genderRandom = random.randint(1,len(gender))
    courseTypeGender = random.randint(1,len(courseType))
    collegeAttendingRandom = random.randint(1,len(collegeAttending))
    dataFile.write("  {\n    school: " + schools[schoolsRandom - 1] + "," + "\n    college: " + collegeAttending[collegeAttendingRandom - 1] + "," + "\n    gender: " + 
    gender[genderRandom - 1] + ","+ " \n    course: " + courseType[courseTypeGender - 1] + "," + "\n  },\n");dataFile.write("\n")

dataFile.write("]")
#closes file

dataFile.close()

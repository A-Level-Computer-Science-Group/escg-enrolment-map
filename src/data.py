#imported library
import random
#set randomly named values to variables
schools = ["Ockylnge", "Ratton", "Cavendish"]
gender = ["Male", "Female"]
courseType = ["A-Level", "Vocational", "Applied General"]
collegeAttending = ["Eastbourne", "Hastings", "Lewes"]
#opens a .ts file and then writes to it
dataFile = open("randomData.ts", "w")
dataFile.write("export const studentInfo:\nStudent[] = [\n")
#loops until condition is met and prints random data
for currentNumber in range(1,10):
    schoolsRandom = random.randint(1,len(schools))
    genderRandom = random.randint(1,len(gender))
    courseTypeGender = random.randint(1,len(courseType))
    collegeAttendingRandom = random.randint(1,len(collegeAttending))
    dataFile.write("   {\n      school: " + schools[schoolsRandom - 1] + "," + "\n      college: " + collegeAttending[collegeAttendingRandom - 1] + "," + "\n      gender: " + gender[genderRandom - 1] + ","+ " \n      course: " + courseType[courseTypeGender - 1] + "," + "\n   },\n");dataFile.write("\n")
dataFile.write("]")
#closes file
dataFile.close()

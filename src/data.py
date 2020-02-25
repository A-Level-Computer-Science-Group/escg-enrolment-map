import random

schools = ["Ockylnge", "Ratton", "Cavendish"]
gender = ["Male", "Female"]
courseType = ["A-Level", "Vocational", "Special Needs"]
collegeAttending = ["Eastbourne", "Hastings", "Lewes"]
dataFile = open("randomData.ts", "w")

for currentNumber in range(1,10):
    schoolsRandom = random.randint(1,len(schools))
    genderRandom = random.randint(1,len(gender))
    courseTypeGender = random.randint(1,len(courseType))
    collegeAttendingRandom = random.randint(1,len(collegeAttending))
    dataFile.write("{\n   school: " + schools[schoolsRandom - 1] + "," + "\n   college: " + collegeAttending[collegeAttendingRandom - 1] + "," + "\n   gender: " + gender[genderRandom - 1] + ","+ " \n   course: " + courseType[courseTypeGender - 1] + "," + "\n},\n");dataFile.write("\n")
    
dataFile.close()
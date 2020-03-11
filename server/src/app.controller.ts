import { Controller, Get, Query } from '@nestjs/common';
import { students, Student } from './data/mod';
import {
  parseQueries,
  applyFilters,
  studentsFromOutcodes,
  studentsFromSchools,
  OutcodeInfo,
  SchoolInfo,
} from './filters/mod';

@Controller('student-data')
export class StudentDataController {
  @Get()
  get(): Student[] {
    return students;
  }
}
@Controller('student-data/schools')
export class SchoolsDataController {
  @Get()
  get(
    @Query('gender') gender?: string,
    @Query('course') course?: string,
  ): SchoolInfo[] {
    return studentsFromSchools(applyFilters(parseQueries(gender, course)));
  }
}
@Controller('student-data/outcodes')
export class OutcodesDataController {
  @Get()
  get(
    @Query('gender') gender?: string,
    @Query('course') course?: string,
  ): OutcodeInfo[] {
    return studentsFromOutcodes(applyFilters(parseQueries(gender, course)));
  }
}

import { Controller, Get, Query } from '@nestjs/common';
import { students, Student } from './data/mod';
import {
  parseQueries,
  applyFilters,
  getSchoolsFromStudents,
} from './filters/mod';
import { StudentsFromOutcodesService } from './filters/studentsFromOutcodes.service';
import { e2e } from 'escg-enrolment-map-core';

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
  ): e2e.SchoolInfo[] {
    return getSchoolsFromStudents(applyFilters(parseQueries(gender, course)));
  }
}
@Controller('student-data/outcodes')
export class OutcodesDataController {
  constructor(
    private studentsFromOutcodesService: StudentsFromOutcodesService,
  ) {}

  @Get()
  async get(
    @Query('gender') gender?: string,
    @Query('course') course?: string,
  ): Promise<e2e.OutcodeInfo[]> {
    return await this.studentsFromOutcodesService.studentsFromOutcodes(
      applyFilters(parseQueries(gender, course)),
    );
  }
}

import { Controller, Get, Query } from '@nestjs/common';
import { students, Student } from './data/mod';
import {
  parseQueries,
  applyFilters,
  studentsFromSchools,
  OutcodeInfo,
  SchoolInfo,
} from './filters/mod';
import { StudentsFromOutcodesService } from './filters/studentsFromOutcodes.service';

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
  constructor(
    private studentsFromOutcodesService: StudentsFromOutcodesService,
  ) {}

  @Get()
  async get(
    @Query('gender') gender?: string,
    @Query('course') course?: string,
  ): Promise<OutcodeInfo[]> {
    return await this.studentsFromOutcodesService.studentsFromOutcodes(
      applyFilters(parseQueries(gender, course)),
    );
  }
}
